const express = require('express');
const { createOrder } = require('../controllers/orderControllers');
const router = express.Router();

// Import the controller function

router.post('/create-order', createOrder);

module.exports = router;
