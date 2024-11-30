import React, { useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { CircleX, Import } from "lucide-react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./image-upload.css";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
}) {
  const inputRef = useRef(null);
  const [imageFileForUpload, setImageFileForUpload] = useState([]);

  const handleImageFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (uploadedFiles.length > 0) {
      setImageFile((prevFiles) => [...prevFiles, ...uploadedFiles]);
      setImageFileForUpload((prevFiles) => [...prevFiles, ...uploadedFiles]);
    }
    e.target.value = "";
  };

  const uploadMultipleImageToCloudinary = async () => {
    if (!imageFileForUpload || imageFileForUpload.length === 0) return;

    setImageLoadingState(true);
    const data = new FormData();
    imageFileForUpload.forEach((file) => data.append("mymulti_file", file));

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/products/uploadmulti-image`,
        data
      );

      if (response.data?.success) {
        const uploadedUrls = response.data.results.map((image) => image.url);
        setUploadedImageUrl((prevUrls) => [
          ...(prevUrls || []),
          ...uploadedUrls,
        ]);
      }
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
    } finally {
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFileForUpload && imageFileForUpload.length > 0) {
      uploadMultipleImageToCloudinary();
      setImageFileForUpload([]);
    }
  }, [imageFileForUpload]);

  const handleRemoveImage = async (fileToRemove, index) => {
    setImageLoadingState(true);

    const updatedFiles = imageFile.filter((file, i) => i !== index);
    setImageFile(updatedFiles);

    if (uploadedImageUrl && uploadedImageUrl[index]) {
      const urlToDelete = uploadedImageUrl[index];

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/products/delete-image`,
          { url: urlToDelete }
        );
        setUploadedImageUrl((prevUrls) =>
          prevUrls.filter((_, i) => i !== index)
        );
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }

    setImageLoadingState(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setImageFile((prevFiles) => [...prevFiles, ...droppedFiles]);
    setImageFileForUpload((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  return (
    <div
      className="imageUpload-placeholder"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        name="productImage"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageFileChange}
      />
      {!imageFile || imageFile.length === 0 ? (
        <label className="image-uploadLabel">
          <BiImageAdd
            size={100}
            onClick={() => inputRef.current.click()}
            style={{ cursor: "pointer" }}
            aria-label="Upload Image"
          />
          <span>Drag & drop or click to upload image</span>
        </label>
      ) : imageLoadingState ? (
        <div className="skeleton-container">
          <Skeleton className="skeleton-loading" />
        </div>
      ) : (
        <div className="image-preview-container">
          {imageFile.map((file, index) => (
            <div key={index} className="image-preview">
              <img
                src={URL.createObjectURL(file)}
                alt={`Product ${index + 1}`}
                className="product-image-preview"
              />
              <CircleX
                onClick={() => handleRemoveImage(file, index)}
                size={20}
                className="image-remove-btn"
                aria-label="Remove Image"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductImageUpload;
