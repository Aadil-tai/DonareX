const express = require('express');
const router = express.Router();

const Contact = require('../models/ContactModel');
const verifyToken = require('../middlewares/verifyToken');

const verifyAdmin = (req, res, next) => {
    console.log("In verifyAdmin middleware:", req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
};
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body


        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(200).json({ message: "Thank you..!We'll be in touch soon" });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


router.get('/contact', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts)
    } catch (error) {
        console.error("Error fetching contacts:", err); // ✅ this will help
        res.status(500).json({ Message: 'Server error while fetching contacts...' })
    }
})
module.exports = router;