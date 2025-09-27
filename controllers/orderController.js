const order = require("../models/orderModel");

async function createOrder(req, res) {
  try {
    const newOrder = await order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal server error",error });
  }
}

async function AllOrders(req, res) {
  try {
    const orders = await order.find().populate("customerID").populate("product.productID");
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.body;
    const deletedOrder = await order.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}

async function updateOrder(req, res) {
 try {
    const {orderID} = req.body;
    const updatedOrder = await order.findOneAndUpdate({ orderID : orderID }, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = {
  createOrder,
  AllOrders,
  deleteOrder,
  updateOrder,
};
