import React, { useContext, useRef } from "react";
import "./ProductTile.css";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../../context/ProductContext";
import axios from "axios";
import { Card } from "@mui/material";
import StarRatingComponent from "../../common/star-rating";

function AdminProductTile({
  product,
  setCurrenrEditedId,
  setFormData,
  handleDelete,
}) {
  const {
    uploadedImageUrl,
    setUploadedImageUrl,
    imageFile,
    setImageFile,
    imageLoadingState,
    setImageLoadingState,
  } = useContext(ProductContext);
  const inputRef = useRef(null);

  const handleRemoveImage = async () => {
    setImageLoadingState(true);
    if (uploadedImageUrl) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/admin/products/delete-image`,
          {
            url: uploadedImageUrl,
          }
        );
        if (response.data?.success) {
          setUploadedImageUrl(null);
          setImageLoadingState(false);
        }
      } catch (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    }
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const navigate = useNavigate();
  return (
    <Card className="Productcard-container">
      <div className="productImage-container">
        <img src={product?.image[0]} alt={product?.productTitle} />
      </div>
      <div className="productDetails-container">
        <div className="product-card-details">
          <span>{product?.productTitle}</span>
          <span>${product?.price}</span>
          <div className="ratingContainer">
            <StarRatingComponent rating={product?.averageReview} />
          </div>
        </div>
        <div className="product-card-action">
          <button
            onClick={() => {
              setCurrenrEditedId(product?._id);
              setFormData(product);
              navigate("/admin/products/addproducts");
            }}
          >
            Edit
          </button>
          <button
            type="delete"
            onClick={async () => {
              await handleDelete(product?._id);
              handleRemoveImage(uploadedImageUrl);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      
    </Card>
    
  );
}

export default AdminProductTile;
