const { Worker } = require("bullmq")
const deadEmailQueue = require("../queues/deadEmailQueue");
const { sendBookingEmail } = require("../utils/sendEmail");
const redis = require("../configs/redis");

console.log("Email worker started..")
const worker=new Worker("EmailQueue",async job => {
    try {
    const {email,booking}=job.data;

    await sendBookingEmail(email,booking);
    } catch (error) {
        console.log(error)
        throw error
    }
},{
    connection:redis
})

worker.on("completed",job=>{
    console.log(`Email sent for ${job.id}`)
})
worker.on("failed",async(job,err)=>{
    console.log(`Job ${job.id} failed:`, err.message);
    if (job.attemptsMade >= 3) {
        await deadEmailQueue.add('deadEmailjob', {
            originalJob: job.data,
            reason: err.message
        })
        console.log("Moved to Dead Email Queue");
    }
})