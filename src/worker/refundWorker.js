const {Worker}=require("bullmq");
const prisma=require("../configs/db");
const redis=require("../configs/redis");

const refundworker=new Worker('deadLetterQueue',async job=>{
    const {originalJob,reason}=job.data;
    const refund=true;
    console.log("refund initiated for:",originalJob.idempotencyKey);
    if(!refund){
        throw new Error("Refund failed");
    }
    for(let seat of originalJob.seats){//release lock
        await redis.del(`OriginalLock:${originalJob.flightId}:${seat}`);
    }
    await prisma.booking.updateMany({
        where:{
            idempotencyKey:originalJob.idempotencyKey
        },
        data:{
            status:'REFUNDED'
        }
    })
    return {
        refunded:true,
        reason
    }
},{
    connection:redis
})
