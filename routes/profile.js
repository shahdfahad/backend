const express
= require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

router.get('/profile', async (req, res) => {
    const authheader = req.headers.authorization;
    if (!authheader) {
        return res.status(401).json({ message: 'Missing Token' });
    }
    const token = authheader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, name: true, email: true }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }catch (error) {
        res.status(400).json({ message: 'Invalid Token' });

    }
});
moudule.exports = router;
