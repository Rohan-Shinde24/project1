const category = require("../models/categoryModel");

async function createCategory(req, res) {
  try {
    const newCategory = await category.create(req.body);
    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
}

module.exports = { createCategory };
