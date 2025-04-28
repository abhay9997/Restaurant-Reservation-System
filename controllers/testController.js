const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      messeage: "Test user data API",
    });
  } catch (error) {
    console.log("Error in test API", error);
  }
};

module.exports = { testUserController };
