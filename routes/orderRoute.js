const order = require('../controllers/orderController');
const express = require('express');
const router = express.Router();

router.post('/orders', order.createOrder);
router.get('/orders', order.getAllOrders);


module.exports = router;