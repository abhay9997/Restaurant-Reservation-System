const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer, usertype } = req.body;
    //Validation
    if (!userName || !email || !password || !address || !phone || !answer || !usertype) {
      return res.status(500).send({
        success: false,
        message: "All fields are mandatory",
      });
    }

    //Check User
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered",
      });
    }

    //Hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = await userModel.create({
      userName,
      email,
      password:hashedPassword,
      address,
      phone,
      answer,
      usertype
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

//Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email OR password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //Check user password OR Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    //Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
