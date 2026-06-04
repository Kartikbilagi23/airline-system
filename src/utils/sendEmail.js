const nodemailer=require("nodemailer")


const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})

const sendBookingEmail=async (to,booking) => {
    console.log(booking)
    const mailoptions={
        from:process.env.EMAIL_USER,
        to,
        subject:"SkyVira Airlines - Booking Confirmed ✈️",
        html:`
        <div style="font-family:Arial;padding:20px">
            <h1 style="color:#2563eb;">SkyVira Airlines</h1>
            <h2>Booking Confirmed ✅</h2>

            <p>Your ticket has been successfully booked.</p>

            <hr/>

            <h3>Flight Details</h3>

            <p><strong>Flight:</strong> ${booking.flight.flightNumber}</p>
            <p><strong>Route:</strong> ${booking.flight.source} → ${booking.flight.destination}</p>
            <p><strong>Seats:</strong> ${booking.seats}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>

            <hr/>

            <p>Thank you for choosing SkyVira Airlines ✈️</p>
        </div>`
    };

    await transporter.sendMail(mailoptions);
}

module.exports={sendBookingEmail};