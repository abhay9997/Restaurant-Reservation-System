const categoryModel = require("../models/categoryModel");

//Create Category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title or image",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Category API",
      error,
    });
  }
};

//Get all category
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No category available",
      });
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all category API",
      error,
    });
  }
};

//Update Category
const updateCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const UpdatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!UpdatedCategory) {
      return res.status(404).send({
        success: false,
        message: "No category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category by Id API",
      error,
    });
  }
};

//Delete Category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide category Id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category found",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryByIdController,
  deleteCategoryController,
};
