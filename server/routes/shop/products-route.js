const express = require("express");

const productsController = require("../../controllers/shop/products.controllers.js");

const router = express.Router();

router.get("/get", productsController.getFilterProducts);
router.get("/get/:id", productsController.getProductDetails);

module.exports = router;
