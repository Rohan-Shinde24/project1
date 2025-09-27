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
      enum: ["admin", "Customer"],
      required : true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
 
  },
  { discriminatorKey: "role", timestamps: true }
);

const User = model("User", userSchema);

const Customer = User.discriminator("Customer", new Schema({
  customerID: {
    type: String,
    required: false,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  pin: {
    type: String,
    required: false,
  },
  
},))



module.exports = { User, Customer };
