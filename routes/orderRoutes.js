const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  orderFoodController,
  orderStatusController,
} = require("../controllers/orderControllers");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//Routes
//Order Food -> POST
router.post("/placeOrder", authMiddleware, orderFoodController);

//Order Status -> POST
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;
