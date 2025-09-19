const product = require('../models/productModel');


const createProduct = async (req, res) => {
    try {
        const newProduct = await product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createProduct,
    getAllProducts
};