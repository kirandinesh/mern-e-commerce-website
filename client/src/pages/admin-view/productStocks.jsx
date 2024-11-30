import React, { useContext, useEffect, useState } from "react";
import "../CSS/admin-view/AdminProductStocks.css";
import { Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAllProduct,
} from "../../features/admin/products-slice";
import { ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { toastOptions } from "../../config";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../context/ProductContext";
function AdminProductStocks() {
  const dispatch = useDispatch();
  const { productList = [] } = useSelector((state) => state.adminProducts);
  const navigate = useNavigate();
  const [noOfElements, setNoOfElements] = useState(5);
  const [start, setStart] = useState(0);

  const productListLength = productList.length;
  const sliceProducts = productList.slice(start, start + noOfElements);
  const { formData, setFormData, currenrEditedId, setCurrenrEditedId } =
    useContext(ProductContext);
  function handleAddMore() {
    if (start + noOfElements < productListLength) {
      setStart((prev) => prev + 5);
    }
  }

  function handleReduce() {
    if (start > 0) {
      setStart((prev) => Math.max(0, prev - 5));
    }
  }

  function handleDeleteProduct(id) {
    dispatch(deleteProduct(id))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllProduct());
          toast.success(data?.payload?.message, toastOptions);
        }
      })
      .catch((err) => {});
  }
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);
  return (
    <div style={{ height: "100%" }}>
      <h2 className="productStock-header">Product Stock</h2>
      <div className="productStock-main-container">
        <Card className="product-stock-card">
          <table className="product-stock-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Title</th>
                <th>Category</th>
                <th>Piece</th>
                <th>Available Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productList.length > 0 ? (
                sliceProducts.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>
                      <Card className="product-image">
                        <img src={item.image[0]} alt={item.productTitle} />
                      </Card>
                    </td>
                    <td>{item.productTitle}</td>
                    <td>{item.category}</td>
                    <td>{item.totalStock}</td>
                    <td>
                      <div className="color-container">
                        {item?.colors.map((color, i) => (
                          <div
                            key={i}
                            className="colorsList"
                            style={{ backgroundColor: color }}
                            title={color}
                          ></div>
                        ))}
                      </div>
                    </td>
                    <td className="stock-action-button">
                      <div className="footerButtons">
                        <div
                          className="pagemove-left"
                          onClick={() => {
                            setCurrenrEditedId(item._id);
                            setFormData(item);
                            navigate("/admin/products/addproducts");
                          }}
                        >
                          <Edit size={15} />
                        </div>
                        <div
                          className="pagemove-right"
                          onClick={() => handleDeleteProduct(item._id)}
                        >
                          <Trash2 size={15} color="#ef3826" strokeWidth={1.2} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No Products Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
      <footer className="productStock-footer">
        <div>
          showing 1-{start + noOfElements} of {productListLength}
        </div>
        <div className="footerButtons">
          <div className="pagemove-left" onClick={handleReduce}>
            <ChevronLeft />
          </div>
          <div className="pagemove-right" onClick={handleAddMore}>
            <ChevronRight />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminProductStocks;
