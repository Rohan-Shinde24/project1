const { User, Customer } = require("../models/userModel");
const bcrypt = require("bcrypt");
const joi = require("joi");
const { generateToken } = require("../utils/authjwtUtils");
const { sendMailes } = require("../services/emailServices");
const genOtp = require("../utils/codegenUtil");



const registeredSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).required(),
});

const forgoatPasswordSchema = joi.object({
    email: joi.string().email().required(),
})

const resetPasswordSchema = joi.object({
  email: joi.string().email().required(),
  newPassword :  joi.string().min(3).required(),
})


async function registerUser(req, res) {
  try {
    const { error } = registeredSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
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

async function forgoatPassword(req, res) {
  try {
    const { email } = forgoatPasswordSchema.validate(req.body);

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "email not exist " });
    }
    const otp = genOtp();

    User.verificationcode = otp;
    await user.save();
    sendMailes({to : email, otp});

    res.status(200).json({message : "OTP is send to your email"})
   
  } catch (err) {
    res.status(500).json({ message: "interneal server error", err });
  }
}

async function resetPassword (req, res) {
  try{
    const {email, otp , newPassword } = resetPasswordSchema.validate(req.body);

    const user = await User.findOne({email:email});
    if(!user){
      res.status(400).json({message : " user not register"})
    }

    if(verificationcode == otp){
      res.status(200).json({message : "otp is correct"})
    }
    const hashedPassword = bcrypt.hash(newPassword, 12)

    User.password = newPassword;
    User.verificationcode = null;

     await user.save()

     res.status(200).json({message: "Password change sucessfully"})

  } 
  catch(err) {
      res.status(400).json({message: "Internal server err", err})
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgoatPassword,
  resetPassword
};
