const express=require("express")
const cors=require("cors")
const prisma=require("./configs/db.js")
const bcrypt=require("bcrypt")
const authRoute=require("./routes/authRoute.js")
const profileRoute=require("./routes/profileRoute.js")
const flightRoutes=require("./routes/flightRoutes.js")
const bookingRoutes=require("./routes/bookingRoutes.js")
const paymentRoutes=require("./routes/paymentRoute.js")
const bullBoard = require("../bullboard.js");
const {client}=require('./configs/metric.js')
const {sendBookingEmail}=require("./utils/sendEmail.js")
const metricMiddleware=require('./middlewares/metricsMiddleware.js')

const app=express();
app.use(cors())

app.use(express.json())
app.use(metricMiddleware);

app.use("/api/auth",authRoute);
app.use("/api/users",profileRoute)
app.use("/api/flights",flightRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/admin/queues", bullBoard.getRouter());

app.get("/health",(req,res)=>{
    res.status(200).json({message:"Server is healthy"})
})
app.get('/metrics',async (req,res) => {
    res.set('Content-Type',client.register.contentType);
    res.end(await client.register.metrics());
})
app.get("/test-email", async (req, res) => {
  try {
    await sendBookingEmail("kartik23@gmail.com", {
      id: "TEST123",
      status: "CONFIRMED",
      seats: ["A1", "A2"],
      flight: {
        flightNumber: "SV101",
        source: "Pune",
        destination: "Delhi"
      }
    });

    res.json({ message: "Email sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed" });
  }
});

module.exports=app;
