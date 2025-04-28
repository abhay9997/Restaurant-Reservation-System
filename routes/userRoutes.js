const express = require("express");
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, userDeleteController} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//Routes
//Get User
router.get("/getUser", authMiddleware, getUserController);

//Update Profile
router.put("/updateUser",authMiddleware,updateUserController);

//Password Update
router.patch("/updatePassword",authMiddleware, updatePasswordController);

//Reset Password
router.post("/resetPassword",authMiddleware, resetPasswordController);

//Delete User
router.delete("/userDelete/:id", authMiddleware, userDeleteController);

module.exports = router;
