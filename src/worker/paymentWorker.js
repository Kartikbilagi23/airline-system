const { Worker } = require("bullmq")
const prisma = require("../configs/db")
const redis = require("../configs/redis");
const deadLetterQueue = require("../queues/deadLetterQueue");
const { bookingCounter } = require("../configs/metric");
const EmailQueue = require("../queues/EmailQueue");

const worker = new Worker('paymentQueue', async job => {
    const { userId, seats, idempotencyKey } = job.data;
    console.log(job.data)
    const flightId = Number(job.data.flightId);

    console.log("Processing payment for:", userId);
    // DB transaction
    try {
        const booking = await prisma.$transaction(async (tx) => {
            const existingbooking = await tx.booking.findUnique({
                where: { idempotencyKey }
            })
            if (existingbooking) {
                return existingbooking;
            }
            const flight = await tx.flight.findUnique({
                where: { id: Number(flightId) }
            });

            if (!flight) {
                throw new Error(`Flight ${flightId} not found`);
            }

            if (flight.availableSeats < seats.length) {
                throw new Error("Not enough seats");
            }
            const seatRecords = await tx.seat.findMany({
                where: {
                    flightId,
                    seatNumber: { in: seats }
                }
            });

            for (let s of seatRecords) {
                if (s.isBooked) {
                    throw new Error(`${s.seatNumber} already booked`);
                }
            }

            await tx.seat.updateMany({
                where: {
                    flightId,
                    seatNumber: { in: seats }
                },
                data: { isBooked: true }
            });

            await tx.flight.update({
                where: { id: flightId },
                data: {
                    availableSeats: {
                        decrement: seats.length
                    }
                }
            });

            const booking = await tx.booking.create({
                data: {
                    userId,
                    flightId,
                    seats: seats.join(","),
                    status: "CONFIRMED",
                    idempotencyKey
                },
                include:{
                    flight:true
                }
            });
            bookingCounter.inc();
            return booking;
        });
        // dsdwdd
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        console.log("Adding job to email queue")
        await EmailQueue.add("booking-email", {
            email: user.email,
            booking
        }, {
            attempts: 3,
            backoff: {
                type: "exponential",
                delay: 2000
            }
        })

        return booking;
        
    } finally {
        // release locks
        for (let seat of seats) {
            await redis.del(`seatLock:${flightId}:${seat}`);
        }
    }

}, {
    connection: redis
});

worker.on('completed', job => {
    console.log(`Job ${job.id} completed`);
});

worker.on('failed', async (job, err) => {
    console.log(`Job ${job.id} failed:`, err.message);
    if (job.attemptsMade >= 3) {
        await deadLetterQueue.add('deadPaymentjob', {
            originalJob: job.data,
            reason: err.message
        })
        console.log("Moved to Dead Letter Queue");
    }
});

