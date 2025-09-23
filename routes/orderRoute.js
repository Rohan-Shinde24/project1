const order = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/orders', authMiddleware, order.createOrder);
router.get('/allorders', authMiddleware, order.AllOrders);
router.post('/deleteorder', authMiddleware, order.deleteOrder);
router.put('/updateorder', authMiddleware, order.updateOrder);


module.exports = router;