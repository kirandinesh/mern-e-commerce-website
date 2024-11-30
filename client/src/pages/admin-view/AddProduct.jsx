import React, { useContext, useEffect, useState } from "react";
import "../CSS/admin-view/AddProducts.css";
import { FaPlusCircle } from "react-icons/fa";
import { ChevronRight, PenLine } from "lucide-react";
import ProductImageUpload from "../../components/admin-view/Image-upload/Image-upload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addNewProduct,
  editProduct,
  fetchAllProduct,
} from "../../features/admin/products-slice";
import { toast } from "react-toastify";
import ProductContext from "../../context/ProductContext";
function AddProduct() {
  const initialFormState = {
    image: null,
    productTitle: "",
    description: "",
    price: "",
    mrp: "",
    details: "",
    measurement: "",
    color: "#000000",
    colors: [],
    additionalInfo: "",
    category: "",
    addlabel: "",
    totalStock: "",
  };

  const {
    formData,
    setFormData,
    currenrEditedId,
    setCurrenrEditedId,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageFile,
    setImageFile,
    imageLoadingState,
    setImageLoadingState,
  } = useContext(ProductContext);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isAdditionalInfoVisible, setIsAdditionalInfoVisible] = useState(false);
  const [togglePencil, setTogglePencil] = useState(false);
  const [productTogglePencil, setProductTogglePencil] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "productTitle"
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value,
    }));
  };

  const handleAddColor = () => {
    if (!formData.colors.includes(formData.color)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, formData.color],
      }));
    }
    setIsColorPickerVisible(false);
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productTitle || !formData.category || !formData.price) {
      toast.error("Please fill in all required fields.", toastOptions);
      return;
    }
    currenrEditedId !== null
      ? dispatch(
          editProduct({
            id: currenrEditedId,
            formData,
          })
        )
          .then((data) => {
            if (data?.payload?.success) {
              resetForm();
              toast.success(data?.payload?.message, toastOptions);
              navigate("/admin/products");
            }
          })
          .catch((err) => toast.error("Edit failed.", toastOptions))
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        )
          .then((data) => {
            if (data?.payload?.success) {
              resetForm();
              toast.success(data?.payload?.message, toastOptions);
              navigate("/admin/products");
            }
          })
          .catch((err) =>
            toast.error("Product addition failed.", toastOptions)
          );
  };

  const resetForm = () => {
    setImageFile(null);
    setFormData(initialFormState);
    setCurrenrEditedId(null);
    dispatch(fetchAllProduct());
  };

  function isFormValid() {
    const requiredFields = Object.keys(formData).filter(
      (key) => key !== "addlabel"
    );

    return requiredFields
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <div className="admin-add-product-container">
      <div className="admin-add-product-title">
        <h2>{currenrEditedId !== null ? "EDIT PRODUCT" : "ADD PRODUCT"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="add-product">
        <div className="add-product-left">
          <div className="image-placeholder">
            <div className="label-container">
              {togglePencil ? (
                <input
                  type="text"
                  className="image-upload-btn"
                  placeholder="Add Label"
                  name="addlabel"
                  value={formData.addlabel}
                  onChange={handleChange}
                  onBlur={() => setTogglePencil(false)}
                  autoFocus
                />
              ) : (
                <p>{formData.addlabel || "Add Label"}</p>
              )}
              <PenLine
                size={20}
                strokeWidth={2}
                color="black"
                onClick={() => setTogglePencil(true)}
                aria-label="Edit Label"
              />
            </div>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
            />
          </div>
        </div>

        <div className="add-product-right">
          <div className="product-content">
            <div className="product-title">
              {productTogglePencil ? (
                <input
                  type="text"
                  placeholder="ADD PRODUCT TITLE"
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleChange}
                  onBlur={() => setProductTogglePencil(false)}
                  required
                  autoFocus
                />
              ) : (
                <p>{formData.productTitle || "ADD PRODUCT TITLE"}</p>
              )}
              <PenLine
                size={20}
                strokeWidth={2}
                color="black"
                onClick={() => setProductTogglePencil(true)}
                aria-label="Edit Product Title"
              />
            </div>

            <div className="product-info">
              <div className="product-desc">
                <textarea
                  name="description"
                  placeholder="Add Description"
                  cols="80"
                  rows="2"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="product-price-container">
                {["price", "mrp", "totalStock"].map((field, index) => (
                  <div className="product-priceAdd" key={index}>
                    <FaPlusCircle className="plusIcon" />
                    <input
                      type="number"
                      name={field}
                      placeholder={`Add ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>

              <div className="product-details-container">
                <input
                  type="text"
                  placeholder="Measurement"
                  name="measurement"
                  value={formData.measurement}
                  onChange={handleChange}
                />

                <div className="product-color-container">
                  <p
                    onClick={() =>
                      setIsColorPickerVisible(!isColorPickerVisible)
                    }
                  >
                    Add color
                  </p>
                  <ChevronRight strokeWidth={0.75} />
                  {isColorPickerVisible && (
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      onBlur={handleAddColor}
                    />
                  )}
                </div>

                <div className="color-list">
                  {formData.colors.map((color, index) => (
                    <span
                      key={index}
                      className="color-item"
                      style={{ backgroundColor: color }}
                      onClick={() => handleRemoveColor(index)}
                      title="Click to remove"
                    ></span>
                  ))}
                </div>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Office">Office</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Outdoor">Outdoor</option>
                </select>

                <div className="product-additional-info-container">
                  <div
                    className={`additional-info-container ${
                      isAdditionalInfoVisible ? "active" : ""
                    }`}
                  >
                    <p
                      className="add-info-button"
                      onClick={() =>
                        setIsAdditionalInfoVisible(!isAdditionalInfoVisible)
                      }
                    >
                      {isAdditionalInfoVisible
                        ? "Hide Additional "
                        : "Additional Info"}
                    </p>
                    <ChevronRight className="arrowIcon" strokeWidth={0.75} />
                  </div>

                  {isAdditionalInfoVisible && (
                    <div className="additional-info-fields">
                      <textarea
                        name="details"
                        placeholder="Add Details"
                        value={formData.details}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="additionalInfo"
                        placeholder="Additional Info"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="addproductForm-button-container">
            <button
              type="submit"
              className={`add-product-btn ${
                imageLoadingState || !isFormValid() ? "disabled" : ""
              }`}
              disabled={imageLoadingState || !isFormValid()}
            >
              {currenrEditedId !== null ? "Save Changes" : "Add Product"}
            </button>

            <button
              onClick={() => {
                resetForm();
                navigate("/admin/products");
              }}
              className="cancel-product-btn"
              disabled={imageLoadingState}
              style={{
                backgroundColor: imageLoadingState ? "#494b4d" : " white",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
