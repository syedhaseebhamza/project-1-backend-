const productModel = require("./model");
const mongoose = require("mongoose");
async function handelGetAllProduct(req, res) {
  try {
    const products = await productModel.find({});
    res.json(products);
  } catch (error) {
    console.log("faild to fetch data", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
}

async function handelGetProductByname(req, res) {
  const { category } = req.params;

  try {
    const products = await productModel.find({
      category: { $regex: new RegExp(category, "i") },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in category ${category}` });
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    res
      .status(500)
      .json({ message: `Failed to fetch products in category ${category}` });
  }
}

async function createProduct(req, res) {
  const { name, price, category } = req.body;
  try {
    const newProduct = new productModel({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
    if (!name || !price || !category)
      return res.status(404).json({ message: "All Field Are Required" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: `Failed to create product ${error}` });
  }
}

async function deleteItemById(req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    }
    res
      .status(200)
      .json({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete product with ID ${id}` });
  }
}

async function updateProductById(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID are required" });
  }
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Name, price, and category are required" });
  }
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, category },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: `Failed to update product with ID ${id}` });
  }
}

module.exports = {
  handelGetAllProduct,
  handelGetProductByname,
  createProduct,
  deleteItemById,
  updateProductById,
};
