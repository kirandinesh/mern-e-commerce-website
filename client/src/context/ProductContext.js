// context/ProductContext.js
import React, { createContext, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    image: [],
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
  });
  const [currenrEditedId, setCurrenrEditedId] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState([]);

  const [imageFile, setImageFile] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  return (
    <ProductContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
