const Product = require("../../models/Product.model");

const getFilterProducts = async (req, res) => {
  try {
    const { category = [], price = [], sortBy = "price_lowtohigh" } = req.query;
    let filters = {};

    // Handle category filter
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    // Handle price filter
    if (price.length) {
      const [min, max] = price.split(",").map(Number);
      filters.price = { $gte: min };
      if (max !== Infinity) {
        filters.price.$lte = max;
      }
    }

    // Handle sorting options
    const sortOptions = {};
    switch (sortBy) {
      case "price_lowtohigh":
        sortOptions.price = 1;
        break;
      case "price_hightolow":
        sortOptions.price = -1;
        break;
      case "title-atoz":
        sortOptions.productTitle = 1;
        break;
      case "title-ztoa":
        sortOptions.productTitle = -1;
        break;
      default:
        sortOptions.price = 1;
        break;
    }

    // fetch filtered and sorted products
    const products = await Product.find(filters).sort(sortOptions);
    console.log(products, "products");

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = { getFilterProducts, getProductDetails };
