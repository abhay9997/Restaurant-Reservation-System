const express = require("express");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  updateCategoryByIdController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//Routes
//Create Category -> POST
router.post("/create", authMiddleware, createCategoryController);

//Get all category -> GET
router.get("/getAll", getAllCategoryController);

//Update category -> PUT
router.put("/updateCategory/:id", authMiddleware, updateCategoryByIdController);

//Delete category -> DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
