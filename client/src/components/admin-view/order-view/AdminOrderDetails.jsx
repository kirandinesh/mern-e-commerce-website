import React, { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import "./AdminOrderDetails.css";
import { useDispatch } from "react-redux";
import {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../../features/admin/orders-slice";
import { toast } from "react-toastify";
import { toastOptions } from "../../../config";
const initialFormData = {
  status: "",
};

function AdminOrderDetails({ orderDetail }) {
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();

  const orderDetails = [
    { label: "Order ID", value: `${orderDetail?._id}` },
    { label: "Order Date", value: `${orderDetail?.orderDate.split("T")[0]}` },
    { label: "Order Price", value: `$${orderDetail?.totalAmount}` },
    { label: "Payment Method", value: `${orderDetail?.paymentMethod}` },
    { label: "Payment Status", value: `${orderDetail?.paymentStatus}` },
    { label: "Order Status", value: `${orderDetail?.orderStatus}` },
  ];

  const shippingInfo = [
    { label: "Address", value: `${orderDetail?.addressInfo?.address}` },
    {
      label: "Name",
      value: `${orderDetail?.addressInfo?.first} ${orderDetail?.addressInfo?.last}`,
    },
    { label: "Email", value: `${orderDetail?.addressInfo?.email}` },
    { label: "Country", value: `${orderDetail?.addressInfo?.country}` },
    { label: "State", value: `${orderDetail?.addressInfo?.state}` },
    { label: "City", value: `${orderDetail?.addressInfo?.city}` },
    { label: "Pincode", value: `${orderDetail?.addressInfo?.pincode}` },
    { label: "Phone", value: `${orderDetail?.addressInfo?.phone}` },
    { label: "Notes", value: `${orderDetail?.addressInfo?.notes}` },
  ];

  const options = [
    { id: "pending", label: "Pending" },
    { id: "inProcess", label: "In Process" },
    { id: "inShipping", label: "In Shipping" },
    { id: "rejected", label: "Rejected" },
    { id: "delivered", label: "Delivered" },
  ];

  const handleUpdateForm = (e) => {
    e.preventDefault();
    console.log("Updated status:", formData.status);
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetail?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetail?._id));
        dispatch(getAllOrdersOfAllUser());
        setFormData(initialFormData);
        toast.success("Order Status Updated Successfully", toastOptions);
      }
    });
  };

  return (
    <DialogContent className="AdminOrderDetails-container">
      {/* Order Details */}
      <div className="AdminOrderDetails-grid-container">
        {orderDetails.map((detail, index) => (
          <div className="AdminOrderDetails-grid" key={index}>
            <p>{detail.label}</p>
            <label>{detail.value}</label>
          </div>
        ))}
      </div>

      {/* Product Details */}
      <section className="shopOrderDetails-Productsection">
        <div className="shopOrderDetails-grid">
          <p>Order Details</p>
          <table className="shopOrderDetails-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.cartItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.productTitle}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="AdminOrderDetails-section">
        <div className="AdminOrderDetails-grid">
          <p>Shipping Info</p>
        </div>
        <div className="AdminOrderDetails-Shipping-Info">
          {shippingInfo.map((info, index) => (
            <div key={index} className="Shipping-Info">
              <span>{info.label}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Update Status Form */}
      <form onSubmit={handleUpdateForm} className="AdminOrderDetails-form">
        <label htmlFor="status">Update Status:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="" disabled>
            Select status
          </option>
          {options.map((op) => (
            <option key={op.id} value={op.id}>
              {op.label}
            </option>
          ))}
        </select>
        <button type="submit" className="AdminOrderDetails-button">
          Update Status
        </button>
      </form>
    </DialogContent>
  );
}

export default AdminOrderDetails;
