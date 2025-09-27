const category = require("../models/categoryModel");

async function createCategory(req, res) {
  try {
    const newCategory = await category.create(req.body);
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
}

async function getAllCategory(req, res) {
  try {
    const categories = await category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
}

async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const update = await category.findByIdAndUpdate(id, req.body);
    if (!update) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", update });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.body;
    const deletedCategory = await category.findByIdAndUpdate({ _id: id }, req.body, { isDeleted: true });
    if (!deletedCategory) { 
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully", deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
}

async function allDeleteCategory(req, res) {
  try {
    const allDeleteCategory = await category.find({  isDeleted: true });
    if (!allDeleteCategory) {
      return res.status(404).json({ message: "No deleted categories found" });
    }
    res.status(200).json({ message: "All deleted categories fetched successfully", allDeleteCategory });
  } catch (error) {
    res.status(500).json({ message: "Error fetching deleted categories", error });
  }
}


module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  allDeleteCategory,
};
