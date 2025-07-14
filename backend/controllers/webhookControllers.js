const crypto = require('crypto');

const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET_WEBHOOK;

exports.handleWebhook = (req, res) => {
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_SECRET)
        .update(req.body)
        .digest('hex');

    if (expectedSignature === signature) {
        const event = JSON.parse(req.body);

        console.log("Verified webhook event:", event.event);

        switch (event.event) {
            case 'payment.captured': {
                const payment = event.payload.payment.entity;
                console.log(' Payment captured:', payment.id, payment.email, payment.amount);
                break;
            }
            case 'payment.failed': {
                console.log(' Payment failed:', event.payload.payment.entity.id);
                break;
            }
            default:
                console.log(' Unhandled event:', event.event);
        }

        res.status(200).json({ received: true });
    } else {
        console.warn(' Invalid webhook signature');
        res.status(400).json({ error: 'Invalid signature' });
    }
};
