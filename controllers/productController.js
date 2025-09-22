const product = require("../models/productModle");

async function createProduct(req, res) {
  try {
    const newProduct = await product.create(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function AllProducts(req, res) {
  try {
    const products = await product.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deletedproduct(req, res) {
  try {
    const { productID } = req.body;
    const deletedProduct = await product.findOneAndDelete({
      productID: productID,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateProduct(req, res) {
  try {
    const { productID, ...updateData } = req.body;

    const updatedProduct = await product.findOneAndUpdate(
      { productID: productID },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}


module.exports = {
  createProduct,
  AllProducts,
  deletedproduct,
  updateProduct,
};
