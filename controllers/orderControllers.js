const orderModel = require("../models/orderModel");

//Order Food
const orderFoodController = async (req, res) => {
  try {
    const {cart} = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please food cart",
      });
    }
    let total = 0;
    //Calculate
    cart.map(i=>{total+=i.price})
    //Validation
    const newOrder = new orderModel({
      foods:cart,
      payment:total,
      buyer:req.body.id
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Order Food API",
      error,
    });
  }
};

//Change order status
const orderStatusController = async(req,res) =>{
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"Please provide valid Order Id"
            })
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId,{status},{new:true})
        res.status(200).send({
            success:true,
            message:"Order status updated"
        })
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Change order status API",
      error,
    });
    }
};

module.exports = {orderFoodController, orderStatusController};