const dotenv = require("dotenv");
const express = require("express");
const productRoutes = require("./app/products/route");
const { connectToDB } = require("./utils/database");

const app = express();
dotenv.config();
const port = process.env.PORT || 1024;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// here is i defined a router if req come on /  then you use the  productRoutes

app.use("/product", productRoutes);

connectToDB()
  .then(() => {
    app.listen(port, () => console.log(`app listen on ${port} `));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
