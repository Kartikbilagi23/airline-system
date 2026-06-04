const express=require('express')
const router=express.Router()
const roleMiddleware= (requireRole) => {
    return (req,res,next)=>{
        if(req.role!=requireRole){
            return res.status(403).json({error:'Access denied'});
        }
        next();
    }
}
module.exports=roleMiddleware;