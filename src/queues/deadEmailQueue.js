const {Queue} =require("bullmq");
const redis=require("../configs/redis");

const deadEmailQueue=new Queue('deadEmailQueue',{
    connection:redis
})

module.exports=deadEmailQueue;