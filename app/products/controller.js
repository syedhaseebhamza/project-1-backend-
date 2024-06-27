const productModel = require("./model");
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
      category: { $regex: new RegExp(category, 'i') }
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
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
}

module.exports = {
  handelGetAllProduct,
  handelGetProductByname,
  createProduct,
};
