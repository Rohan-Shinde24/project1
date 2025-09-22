const product = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.post('/products', product.createProduct);
router.get('/allproducts', product.AllProducts);
router.post('/deleteproduct', product.deletedproduct);
router.put('/updateproduct', product.updateProduct);

module.exports = router;