const asyncHandler = require('express-async-handler');
const razorpay = require('../config/razorpay.config');
const Donation = require('../models/ContributionSchemas');

const createOrder = asyncHandler(async (req, res) => {
    const { name, email, phone, amount, tip = 0, anonymous, address, currency = "INR" } = req.body;

    if (!name || !email || !phone || !amount || !address) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const tipAmount = Math.round((amount * tip) / 100);
    const totalAmount = amount + tipAmount;

    const displayName = anonymous ? "Anonymous" : name;
    const displayEmail = anonymous ? "anonymous@example.com" : email;

    const options = {
        amount: totalAmount * 100,
        currency: currency.toUpperCase(),
        receipt: `receipt_${Date.now()}`,
        notes: {
            name: displayName,
            email: displayEmail,
            phone,
            address
        }
    };


    const order = await razorpay.orders.create(options);


    await Donation.create({
        name: displayName,
        email: displayEmail,
        phone,
        address,
        amount,
        tip,
        totalAmount,
        anonymous,
        orderId: order.id,
        status: 'pending',
    });

    res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_TEST_KEY_ID,
        name: "NGO"
    });
});

module.exports = { createOrder };
