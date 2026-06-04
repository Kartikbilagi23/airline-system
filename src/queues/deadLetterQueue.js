const {Queue} =require("bullmq");
const redis=require("../configs/redis");

const deadLetterQueue=new Queue('deadLetterQueue',{
    connection:redis
})

module.exports=deadLetterQueue;