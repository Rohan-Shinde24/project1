const order = require('../models/orderModel');

const createOrder = async (req, res) => {
    try {
        const newOrder = await order.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createOrder,
    getAllOrders
};