const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const prisma = require('../configs/db.js')


router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }
        const user = await prisma.user.create({
            data: {
                name, email, password: hashedpassword
            }
        })
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const ismatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", ismatch);
        if (!ismatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign(
            { userId: user.id ,
            role:user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;