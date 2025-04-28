const mongoose = require("mongoose");

//Function mongoDb database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = connectDb;
