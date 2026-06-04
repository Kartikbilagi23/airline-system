const express=require("express")
const router=express.Router()
const prisma=require('../configs/db')
const redis=require('../configs/redis')
const authMiddleware=require('../middlewares/authMiddleware')
const paymentQueue = require("../queues/paymentQueue")
const { sendBookingEmail } = require("../utils/sendEmail")

router.post('/',authMiddleware,async (req,res) => {
    try {
        const {flightId,seats}=req.body;
        //db transactions
        const result=await prisma.$transaction(async(tx)=>{
            //get flight
            const flight=await tx.flight.findUnique({
                where:{id:flightId}
            })
            if(!flight){
                throw new Error("Flight not found");
            }
            //check availability
            if(flight.availableSeats<seats.length){
                throw new Error("Not enough seats available")
            }
            //update seats
            await tx.flight.update({
                where:{id:flightId},
                data:{
                    availableSeats:{
                        decrement:seats.length
                    }
                }
            })
            //create booking
            const booking=await tx.booking.create({
                data:{
                    userId:req.userId,
                    flightId,
                    seats:seats.join(","),
                    status:"CONFIRMED"
                },
                include:{
                    flight:true
                }
            })
            const user=await tx.user.findUnique({
                where:{
                    id:req.userId
                }
            })
            return {booking,user};
        })
        console.log(result.user.email)
        await sendBookingEmail(result.user.email,result.booking);
        res.status(201).json(result.booking);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})
router.post("/lock-seats",authMiddleware, async (req,res) => {
        const{flightId,selectedSeats}=req.body;
    try {
        for (let seat of selectedSeats){
            const key=`seatLock:${flightId}:${seat}`;
            console.log("Locking:", key, "by user:", req.userId);
            const existingLock=await redis.get(key);
            if(existingLock&&existingLock!==String(req.userId)){
                return res.status(400).json({message:`Seat ${seat} already locked`})
            }
        }
        //lock all seats
        for(let seat of selectedSeats){
            const key=`seatLock:${flightId}:${seat}`;
            await redis.set(key,req.userId,'EX',300);
        }
        res.json({message:'Seats locked successfully'})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})
router.post("/confirm-seats",authMiddleware,async (req,res) => {
    try {
        const {flightId,seats}=req.body;
        for(let seat of seats){
            const key=`seatLock:${flightId}:${seat}`
            const lockedBy=await redis.get(key);
            console.log("Checking:", key, "lockedBy:", lockedBy);
            if(!lockedBy||lockedBy!==String(req.userId)){
                return res.status(400).json({message:`Seat ${seat} not locked by you`})
            }
        }
        const idempotencyKey=`booking_${req.userId}_${flightId}_${Date.now()}`;
        await paymentQueue.add("paymentjob",{
            userId:req.userId,
            flightId,
            seats,
            idempotencyKey
        })
        res.json({
            message:"Payment processing started",
            status:"PENDING"
        });
    } catch (error) {
        res.status(400).json({error:error.message});
    }
})
router.get("/:id",async (req,res) => {
    try {
        const {id}= req.params;
        const flight=await prisma.flight.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!flight){
            return res.status(404).json({
                error:"Flight not found"
            })
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})
router.get('/available-seats/:flightId',async (req,res) => {
    try {
        const {flightId}=req.params;
        const seats=await prisma.flight.findMany({
            where:{flightId:parseInt(flightId)}
        })
        const result=[]
        for (let seat of seats){
            const lockkey=`seatLock:${flightId}:${seat.seatNumber}`;
            const lockedBy=await redis.get(lockkey);
            result.push({
                seatNumber:seat.seatNumber,
                isBooked:seat.isBooked,
                islocked:!!lockedBy,
            })
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})












// router.post("/lock",async (req,res) => {
//     try {
//         const {flightId,seats}=req.body;
//         const lockKey=`lock:${flightId}`;
//         //check if user already locked
//         const existingLock=await redis.get(lockKey);
//         if(existingLock){
//             return res.status(400).json({error:"You already locked seats"})
//         }
//         await redis.set(lockKey,seats,'EX',300);
//         res.json({message:"Seat locked for 5 minutes"})
//     } catch (error) {
//         res.status(500).json({error:error.message});
//     }
// })

// router.post("/confirm",authMiddleware,async (req,res) => {
//     try {
//         const {flightId}=req.body;
//         const lockKey=`lock:${flightId}:${req.userId}`;
//         const lockedSeats=await redis.get(lockKey);
//         if(!lockedSeats){
//             return res.status(400).json({error:"Lock expired,try again"})
//         }
//         const seats=parseInt(lockedSeats);
//         const booking=await prisma.$transaction(async(tx)=>{
//             const flight=await tx.flight.findUnique({
//                 where:{
//                     id:flightId
//                 }
//             })
//             if(flight.availableSeats<seats){
//                 throw new Error("Not enough seats");
//             }
//             await tx.flight.update({
//                 where:{id:flightId},
//                 data:{
//                     availableSeats:flight.availableSeats-seats
//                 }
//             })
//             const booking=await tx.booking.create({
//                 data:{
//                     userId:req.userId,
//                     flightId,
//                     seats,
//                     status:'CONFIRMED'
//                 }
//             })
//             return booking;
//         })
//         //remove lock after success(this user's lock)
//         await redis.del(lockKey);
//         res.status(201).json(booking);
//     } catch (error) {
//         res.status(400).json({error:error.message});
//     }
// })



module.exports=router;