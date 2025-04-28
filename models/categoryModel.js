const mongoose = require("mongoose");

//Schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://previews.123rf.com/images/ionutparvu/ionutparvu1612/ionutparvu161200410/67602131-categories-stamp-sign-text-word-logo-red.jpg",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
