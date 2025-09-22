const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderID: { type: String, required: true },
  customerID: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
},{ timestamps: true });

const Order = model("Order", orderSchema);

module.exports = Order;
