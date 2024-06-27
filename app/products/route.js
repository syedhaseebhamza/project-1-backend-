const express = require("express");
const router = express.Router();
const {
  handelGetAllProduct,
  handelGetProductByname,
  createProduct,
} = require("./controller");

router.route("/").get(handelGetAllProduct).post(createProduct);
router.get("/:category", handelGetProductByname);

module.exports = router;
