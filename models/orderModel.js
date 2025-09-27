const { Schema, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    orderID: { type: String, required: true },
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    price: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;
