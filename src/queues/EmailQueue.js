const {Queue}=require("bullmq");
const redis = require("../configs/redis");

const EmailQueue=new Queue("EmailQueue",{
    connection:redis
})

module.exports=EmailQueue;