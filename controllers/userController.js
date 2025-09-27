const { User, Customer } = require("../models/userModel");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { generateToken } = require("../utils/authjwtUtils");

const registeredSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
  role: joi.string().valid("admin", "Customer").required(),
});
const updateProfileSchema = joi.object({
  customerID: joi.string().required(),
  phone: joi.string().min(10).max(10).required(),
  address: joi.string().min(3).max(100).required(),
  pin: joi.string().min(6).max(6).required(),
});

async function registerUser(req, res) {
  try {
    const { error } = registeredSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error", err });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(existingUser);
    res.header("set-Cookie", "token=" + token + "; Path=/; Max-Age=3600; ");
    res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error", err });
  }
}

async function updateProfile(req, res) {
  try {
    const userid = req.user.id;
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // Find the user and check role
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role !== "Customer") {
      return res
        .status(403)
        .json({ message: "Only customers can update their profile" });
    }

    // Use Customer discriminator for update
    const { customerID, phone, address, pin } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(userid, {
      customerID,
      phone,
      address,
      pin,
    });
    return res.status(200).json({
      message: "Profile updated successfully",
      updatedCustomer,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}
async function getallUser(req, res) {
  try {
    const customer = await User.find();
    res.status(200).json({ message: "all order", customer });
  } catch (error) {
    res.status(400).json({ message: "internal server err", error });
  }
}

async function deleatUser(req, res) {
  try {
    const { id } = req.body;
    const deleatuser = await User.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true }
    );
    if (!deleatuser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}


module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getallUser,
  deleatUser,
};
