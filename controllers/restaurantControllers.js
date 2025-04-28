const restaurantModel = require("../models/restaurantModel");

//Create Restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageURL,
      foods,
      time,
      delivery,
      pickup,
      isOpen,
      logoURL,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    //Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageURL,
      foods,
      time,
      delivery,
      pickup,
      isOpen,
      logoURL,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();
    res.status(201).send({
      success: true,
      message: "New Restaurant added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error,
    });
  }
};

//Get all restaurants
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all restaurant API",
      error,
    });
  }
};

//Get restaurant by Id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Restaurant Id",
      });
    }
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get restaurant by Id API",
      error,
    });
  }
};

//Delete Restaurant
const deleteRestaurantController = async(req,res) => {
  try {
    const restaurantId = req.params.id

    if(!restaurantId){
      return res.status(404).send({
        success:false,
        message:"No restaurant found OR Please provide restaurant Id"
      })
    }
    await restaurantModel.findByIdAndDelete(restaurantId)
    res.status(200).send({
      success:true,
      message:"Restaurant deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error in delete restaurant API",
      error
    })
  }
}

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController
};
