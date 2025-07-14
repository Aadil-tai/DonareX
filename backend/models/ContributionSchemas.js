const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String
        },
        anonymous: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            required: true
        },
        tip: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        razorpayOrderId: {
            type: String
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contribution', ContributionSchema);
