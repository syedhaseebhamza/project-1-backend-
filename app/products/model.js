const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const product = mongoose.model("product", productScheme);
module.exports = product;
