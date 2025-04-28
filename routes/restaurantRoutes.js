const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantControllers");
const router = express.Router();

//Routes
//Create Restaurant -> POST
router.post("/create", authMiddleware, createRestaurantController);

//Get all restaurants -> GET
router.get("/getAll", getAllRestaurantController);

//Get restaurant by Id -> GET
router.get("/get/:id", getRestaurantByIdController);

//Delete restaurant -> DELETE
router.delete("/delete/:id",authMiddleware, deleteRestaurantController);

module.exports = router;
