const {Queue}=require("bullmq");
const redis=require("../configs/redis");

const paymentQueue=new Queue('paymentQueue',{
    connection:redis
})

module.exports=paymentQueue;