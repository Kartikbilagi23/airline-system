const express=require('express')
const router=express.Router()
const prisma=require("../configs/db.js")
const authMiddleware=require('../middlewares/authMiddleware.js')
const roleMiddleware=require("../middlewares/roleMiddleware.js")
const redis = require('../configs/redis.js')

router.post('/',authMiddleware,roleMiddleware("ADMIN"),async (req,res) => {
    try {
        const{
            flightNumber,
            source,
            destination,
            departureTime,
            arrivalTime,
            price,
            totalSeats
        }=req.body;
        const seatData=[]
        for(let i=0;i<totalSeats;i++){
            seatData.push({
                seatNumber:`A${i}`,
            })
        }
        const flight=await prisma.flight.create({
            data:{
            flightNumber,
            source,
            destination,
            departureTime:new Date(departureTime),
            arrivalTime:new Date(arrivalTime),
            price,
            totalSeats,
            availableSeats:totalSeats,
            seats:{
                create:seatData
            }
            },
            include:{seats:true}
        })
        res.status(201).json(flight);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
})
router.get('/search',async (req,res) => {
    try {
        const {source,destination}=req.query;
        const cacheKey=`flights:${source}:${destination}`;
        const cached=await redis.get(cacheKey);
        if(cached){
            console.log('Cache hit!')
            return res.json(JSON.parse(cached));
        }
        console.log('DB hit!')
        const flights=await prisma.flight.findMany({
            where:{
                source,destination
            }
        })
        const ttl=60+Math.floor(Math.random()*10);//imp it solved 3 major redis issue caused in booking system
        //Prevents all cache expiring at same time
        //TTL to store in redis temporitly
        await redis.set(cacheKey,JSON.stringify(flights),'EX',ttl)
        res.json(flights);
    } catch (error) {
        res.status(500).json({error:error.message});
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




module.exports=router;






