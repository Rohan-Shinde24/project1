const { required } = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    verificationcode: {
      type: Number,
    },
    isverified: {
      type: Boolean,
    
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

const customerSchema = new Schema({
  customerID: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
});

const Customer = User.discriminator("Customer", customerSchema);

module.exports = { User, Customer };
