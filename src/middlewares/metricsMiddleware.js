const {httpRequestCounter,httpRequestDuration, bookingCounter, paymentFailureCounter}=require("../configs/metric");

const metricMiddleware=(req,res,next)=>{
    const start=Date.now();
    res.on('finish',()=>{
        const route=req.route?.path||req.baseUrl||"unknown"
        const duration=(Date.now()-start)/1000;
        

        httpRequestCounter.inc({
            method:req.method,
            route:route.toString(),
            status:res.statusCode.toString()
        })
        httpRequestDuration.observe({
            method:req.method,
            route:req.originalUrl,
            status:res.statusCode.toString()
        },duration);
        // paymentFailureCounter.inc()
    })
    next();
}

module.exports=metricMiddleware;