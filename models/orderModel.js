const {Schema,model} = require("mongoose");

const orderSchema = new Schema({
    
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }

})

const Order = model("Order", orderSchema);

module.exports = Order;
