const prisma = require('../configs/db');
const redis = require('../configs/redis');
const authMiddleware=require("../middlewares/authMiddleware");
const paymentQueue = require('../queues/paymentQueue');
const crypto=require("crypto")
const razorpay=require("../configs/razorpay");
const express=require('express');
const router=express.Router()
require('dotenv').config();

// router.post("/pay",authMiddleware,async (req,res) => {
//     try {
//         const {flightId,seats,idempotencyKey}=req.body;
//         if(!idempotencyKey){
//             return res.status(400).json({message:"idempotency Key required"})
//         }
//         const existing=await prisma.booking.findUnique({
//             where:{idempotencyKey}
//         })
//         if(existing){
//             return res.json({
//                 message:"Already processed",
//                 booking:existing
//             })
//         }
//         for(let seat of seats){
//             const key=`seatLock:${flightId}:${seat}`;
//             const lockedBy=await redis.get(key);
//             if(!lockedBy||parseInt(lockedBy)!==req.userId){
//                 return res.status(400).json({
//                     error:`Seat ${seat} not locked by you`
//                 })
//             }
//         }
//         const paymentsuccess=true;//to replace with stripe
//         if(!paymentsuccess){
//             return res.status(400).json({error:"Payment failed"});
//         }
//         const booking=await prisma.$transaction(async(tx)=>{
//             const seatRecords=await tx.seat.findMany({
//                 where:{
//                     flightId,
//                     seatNumber:{in:seats}
//                 }
//             })
//             console.log(seatRecords);
//             for(let s of seatRecords){
//                 if(s.isBooked){
//                     throw new Error(`${s.seatNumber} already booked`);
//                 }
//             }
//             await tx.seat.updateMany({
//                 where:{
//                     flightId,
//                     seatNumber:{in:seats},
//                 },
//                 data:{isBooked:true}
//             })
//             await tx.flight.update({
//                 where:{id:flightId},
//                 data:{
//                     availableSeats:{
//                         decrement:seats.length
//                     }
//                 }
//             })
//             const booking=await tx.booking.create({
//                 data:{
//                     userId:req.userId,
//                     flightId,
//                     seats:seats.length,
//                     status:"CONFIRMED",
//                     idempotencyKey
//                 }
//             })
//             return booking;
//         })
//         for(let seat of seats){
//             await redis.del(`seatLock:${flightId}:${seat}`);
//         }
//         res.json({booking});

//     } catch (error) {
//         if(error.code==='P2002'){//idempotency duplicates
//             const existing=await prisma.booking.findUnique({
//                 where:{idempotencyKey:req.body.idempotencyKey}
//             })
//             return res.json({booking:existing})
//         }
//         res.status(500).json({error:error.message});
//     }
// })
router.post('/create-order',authMiddleware,async (req,res) => {
    try {
       const {amount,flightId,seats}=req.body;
       const options={
        amount:amount*100,//razorpay uses paise
        currency:'INR',
        receipt:`receipt_${Date.now()}`
       } 
       const order =await razorpay.orders.create(options);
       console.log("order ka data:",order)
       res.json({
        order_id:order.id,
        amount:order.amount,
        currency:order.currency,
        flightId,
        seats
       })

    } catch (error) {
        res.status(500).json({error:error.message});
        console.log(error)
    }
})
router.post('/verify-payments',authMiddleware,async (req,res) => {
    try {
        console.log(req.body)
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            flightId,
            seats
        }=req.body;
        console.log(razorpay_order_id);
        console.log(razorpay_payment_id);
        console.log(razorpay_signature);
        console.log(process.env.RAZORPAY_KEY_SECRET)
        const body=razorpay_order_id+"|"+razorpay_payment_id;
        const expectedSignature=crypto.
        createHmac('sha256',process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
        if(expectedSignature!==razorpay_signature){
            return res.status(400).json({
                error:'Invalid payment signature'
            })
        }
        await paymentQueue.add('paymentJob',{
            userId:req.userId,
            flightId,
            seats,
            idempotencyKey:razorpay_payment_id
        },{
            attempts:3,
            backoff:{
                type:"exponential",
                delay:2000
            }
        })
        res.json({
            success:true,
            message:'payment verified, booking processing'
        })

    } catch (error) {
        res.status(500).json({error:error.message});
    }
})
// router.post('/pay', authMiddleware, async (req, res) => {
//   try {
//     const { flightId, seats, idempotencyKey } = req.body;

//     if (!idempotencyKey) {
//       return res.status(400).json({ error: "Idempotency key required" });
//     }

//     // 1. Check if already processed
//     const existing = await prisma.booking.findUnique({
//       where: { idempotencyKey }
//     });

//     if (existing) {
//       return res.json({
//         message: "Already processed",
//         booking: existing
//       });
//     }

//     // 2. Validate seat lock
//     for (let seat of seats) {
//       const key = `seatLock:${flightId}:${seat}`;
//       const lockedBy = await redis.get(key);

//       if (!lockedBy || parseInt(lockedBy) !== req.userId) {
//         return res.status(400).json({
//           error: `Seat ${seat} not locked by you`
//         });
//       }
//     }

//     // 3. Simulate payment (replace with Stripe later)
//     const paymentSuccess = true;

//     if (!paymentSuccess) {
//       return res.status(400).json({ error: "Payment failed" });
//     }

//     // 4. Transaction (VERY IMPORTANT)
//     const booking = await prisma.$transaction(async (tx) => {

//       const seatRecords = await tx.seat.findMany({
//         where: {
//           flightId,
//           seatNumber: { in: seats }
//         }
//       });

//       for (let s of seatRecords) {
//         if (s.isBooked) {
//           throw new Error(`Seat ${s.seatNumber} already booked`);
//         }
//       }

//       // mark seats booked
//       await tx.seat.updateMany({
//         where: {
//           flightId,
//           seatNumber: { in: seats }
//         },
//         data: { isBooked: true }
//       });

//       // update flight seats
//       await tx.flight.update({
//         where: { id: flightId },
//         data: {
//           availableSeats: {
//             decrement: seats.length
//           }
//         }
//       });

//       // create booking WITH idempotencyKey
//       const booking = await tx.booking.create({
//         data: {
//           userId: req.userId,
//           flightId,
//           seats: seats.length,
//           status: "CONFIRMED",
//           idempotencyKey
//         }
//       });

//       return booking;
//     });

//     // 5. Clear locks
//     for (let seat of seats) {
//       await redis.del(`seatLock:${flightId}:${seat}`);
//     }

//     res.json({ booking });

//   } catch (error) {

//     // handle unique constraint (idempotency duplicate)
//     if (error.code === 'P2002') {
//       const existing = await prisma.booking.findUnique({
//         where: { idempotencyKey: req.body.idempotencyKey }
//       });

//       return res.json({ booking: existing });
//     }

//     res.status(500).json({ error: error.message });
//   }
// });


module.exports=router;