const foodModel = require("../models/foodModel");

//Create Category
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isFoodAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    //Validation
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all mandatory fields",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isFoodAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "Food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Food API",
      error,
    });
  }
};

//Get all food
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food items available",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all foods API",
      error,
    });
  }
};

//Get single food
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide FoodID",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food available",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

//Update Food
const updateFoodByIdController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "No food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isFoodAvailable,
      restaurnat,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isFoodAvailable,
        restaurnat,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food by Id API",
      error,
    });
  }
};

//Delete Food
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please provide food Id",
      });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "No food found",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  updateFoodByIdController,
  deleteFoodController,
};
