const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//GET USER INFO
const getUserController = async (req, res) => {
  try {
    //Find user
    const user = await userModel.findById({ _id: req.body.id });

    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //Hide password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User data get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User API",
      error,
    });
  }
};

//Update User
const updateUserController = async (req, res) => {
  try {
    //Find user
    const user = await userModel.findById({ _id: req.body.id });

    //Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //Update
    const { userName, address, phone, usertype} = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    if (usertype) user.usertype = usertype;
    

    //Save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update user API",
      error,
    });
  }
};

//Update user password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or Invalid answer",
      });
    }
    //Hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password API",
      error,
    });
  }
};

const userDeleteController = async(req,res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
      success:true,
      message:"Your profile has been deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in delete profile API",
      error
    })
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  userDeleteController
};
