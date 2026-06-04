const authMiddleware=require("../middlewares/authMiddleware")
const prisma=require('../configs/db');
const express=require("express")
const router=express.Router()

router.get("/profile",authMiddleware,async (req,res) => {
    const user=await prisma.user.findUnique({
        where:{id:req.userId}
    });
    res.json(user);
})

module.exports=router;