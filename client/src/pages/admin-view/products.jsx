import React, { useContext, useEffect } from "react";
import "../CSS/admin-view/AdminProducts.css";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "../../components/admin-view/Product-tile/ProductTile";
import {
  deleteProduct,
  fetchAllProduct,
} from "../../features/admin/products-slice";
import ProductContext from "../../context/ProductContext";
import { toast } from "react-toastify";
import { Card } from "@mui/material";

function AdminProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);

  const { setFormData, setCurrenrEditedId } = useContext(ProductContext);

  const initialFormState = {
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
  };

  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleDelete = async (productId) => {
    dispatch(deleteProduct(productId))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          toast.success(data.payload.message, toastOptions);
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <div className="adminProduct-container">
      <header className="product-title">
        <h2>Products</h2>
      </header>
      <section className="product-banner"></section>

      <div
        className="admin-addProduct-container"
        onClick={() => {
          setCurrenrEditedId(null);
          setFormData(initialFormState);
          navigate("/admin/products/addproducts");
        }}
      >
        <button className="admin-addProduct">
          <Plus size={28} color="#141718" strokeWidth={2.25} />
          Add New Product
        </button>
      </div>

      <main className="adminProduct-card-container">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setCurrenrEditedId={setCurrenrEditedId}
              product={productItem}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </main>
    </div>
  );
}

export default AdminProducts;
