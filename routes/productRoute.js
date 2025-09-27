const product = require('../controllers/productController');
const { authMiddleware , adminMiddleware } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/products', authMiddleware, adminMiddleware, product.createProduct);
router.get('/allproducts', authMiddleware, adminMiddleware, product.AllProducts);
router.post('/deleteproduct', authMiddleware, adminMiddleware, product.deletedproduct);
router.put('/updateproduct', authMiddleware, adminMiddleware, product.updateProduct);

module.exports = router;