const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function imageUploadUtil(imageUrl) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
}

async function multipleImageUploadUtil(imageUrl) {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
}

async function imageDeleteUtil(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
  }
}

module.exports = {
  upload,
  imageUploadUtil,
  multipleImageUploadUtil,
  imageDeleteUtil,
};
