const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  updateFoodByIdController,
  deleteFoodController,
} = require("../controllers/foodControllers");

const router = express.Router();

//Routes
//Create Food -> POST
router.post("/create", authMiddleware, createFoodController);

//Get all foods -> GET
router.get("/getAll", getAllFoodsController);

//Get Single Food -> GET
router.get("/getFood/:id", getSingleFoodController);

//Update Food -> PUT
router.put("/updateFood/:id", authMiddleware, updateFoodByIdController);

//Delete Food -> DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;
