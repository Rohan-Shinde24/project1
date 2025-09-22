const order = require('../controllers/orderController');
// const { authMiddleware } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/orders',  order.createOrder);
router.get('/allorders',  order.AllOrders);
router.post('/deleteorder', order.deleteOrder);
router.put('/updateorder',  order.updateOrder);


module.exports = router;