const express = require("express");

const {
  handleImageUpload,
  handleImageDelete,
  handleMultipleImageUpload,
} = require("../../controllers/admin/products.controllers.js");

const {
  addProduct,
  editProduct,
  deleteProduct,
  fetchProduct,
} = require("../../controllers/admin/products.controllers.js");

const { upload } = require("../../helpers/cloudinary");

const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post(
  "/uploadmulti-image",
  upload.array("mymulti_file"),
  handleMultipleImageUpload
);
router.post("/delete-image", handleImageDelete);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchProduct);

module.exports = router;
