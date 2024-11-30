const Product = require("../../models/Product.model");

const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        success: false,
        message: "KeyWord is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { productTitle: regEx },
        { description: regEx },
        { category: regEx },
      ],
    };

    const searchResult = await Product.find(createSearchQuery);
    res.status(200).json({
      success: true,
      data: searchResult,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some error",
    });
  }
};

module.exports = { searchProduct };
