const express = require('express');
const router = express.Router();

const Contact = require('../models/ContactModel');


router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body


        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fileds are required" })
        }

        const contact = new Contact({ name, email, message });
        await contact.save();

        res.status(200).json({ message: "Thank you..!We'll be in touch soon" });
    } catch (error) {
        console.error('Error saving contact form:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;