const Razorpay = require('razorpay');
const dotenv = require("dotenv");
dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_TEST_KEY_ID,
    key_secret: process.env.RAZORPAY_TEST_KEY_SECRET
});

module.exports = razorpayInstance;
