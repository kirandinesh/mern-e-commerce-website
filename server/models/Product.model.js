const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    productTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    totalStock: {
      type: Number,
      required: true,
    },
    measurement: {
      type: String,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    colors: {
      type: [String],
    },
    additionalInfo: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    addlabel: {
      type: String,
      trim: true,
    },
    averageReview: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
