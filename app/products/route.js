const express = require("express");
const router = express.Router();
const {
  handelGetAllProduct,
  handelGetProductByname,
  createProduct,
  deleteItemById,
  updateProductById,
} = require("./controller");

router.route("/").get(handelGetAllProduct).post(createProduct);
router.get("/:category", handelGetProductByname);
router.route("/:id").delete(deleteItemById).patch(updateProductById);

module.exports = router;
