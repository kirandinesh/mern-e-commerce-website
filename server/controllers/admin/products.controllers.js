const {
  imageUploadUtil,
  imageDeleteUtil,
  multipleImageUploadUtil,
} = require("../../helpers/cloudinary");
const Product = require("../../models/Product.model");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return res
        .status(400)
        .json({ success: false, message: "Only image files are allowed" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err) {
    console.error("Error occurred during file upload", err);
    return res
      .status(500)
      .json({ success: false, message: "Error occurred during file upload" });
  }
};


const handleMultipleImageUpload = async (req, res) => {
  try {
    const images = req.files;
    if (!images || images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No files uploaded" });
    }

    const uploadPromises = images.map((file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const url = `data:${file.mimetype};base64,${b64}`;
      return multipleImageUploadUtil(url); 
    });

    const results = await Promise.all(uploadPromises);
    res.status(200).json({ success: true, results }); 
  } catch (err) {
    res.status(500).json({ success: false, message: "File upload error" });
  }
};

//
const handleImageDelete = async (req, res) => {
  try {
    const { url } = req.body;
    const publicId = url.split("/").pop().split(".")[0];

    const result = await imageDeleteUtil(publicId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      result,
    });
  } catch (err) {
    console.error("Error occurred during file deletion", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred during file deletion",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      productTitle,
      description,
      price,
      mrp,
      totalStock,
      measurement,
      details,
      colors,
      additionalInfo,
      category,
      addlabel,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      productTitle,
      description,
      price,
      mrp,
      totalStock,
      measurement,
      details,
      colors,
      additionalInfo,
      category,
      addlabel,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
    });
  }
};

//edit a product
let editProduct = async (req, res) => {
  const {
    image,
    productTitle,
    description,
    price,
    mrp,
    totalStock,
    measurement,
    details,
    colors,
    additionalInfo,
    category,
    addlabel,
  } = req.body;

  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    console.log(findProduct.colors, "color arry in backend");

    // If the product is not found, return a 404 error
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    findProduct.productTitle = productTitle || findProduct.productTitle;
    findProduct.description = description || findProduct.description;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.mrp = mrp === "" ? 0 : mrp || findProduct.mrp;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.measurement = measurement || findProduct.measurement;
    findProduct.details = details || findProduct.details;
    findProduct.colors = colors || findProduct.colors;
    findProduct.additionalInfo = additionalInfo || findProduct.additionalInfo;
    findProduct.category = category || findProduct.category;
    findProduct.addlabel = addlabel || findProduct.addlabel;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: findProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating the product",
    });
  }
};
//fetch all product
const fetchProduct = async (req, res) => {
  try {
    const listAllProducts = await Product.find({});
    res.status(201).json({
      success: true,
      data: listAllProducts,
      message: "product fetched sucessfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error fetch product ",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error deleting product ",
    });
  }
};

module.exports = {
  handleImageUpload,
  handleImageDelete,
  handleMultipleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchProduct,
};
