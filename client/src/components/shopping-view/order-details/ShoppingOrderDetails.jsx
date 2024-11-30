import React from "react";
import "./ShoppingOrderDetails.css";
import { DialogContent } from "@mui/material";
function ShoppingOrderDetails({ orderDetail }) {
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

  return (
    <DialogContent className="shopOrderDetails-container">
      {/* Order Details */}
      <div className="shopOrderDetails-grid-container">
        {orderDetails.map((detail, index) => (
          <div className="shopOrderDetails-grid" key={index}>
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
      <section className="shopOrderDetails-section">
        <div className="shopOrderDetails-grid">
          <p>Shipping Info</p>
        </div>
        <div className="shopOrderDetails-Shipping-Info">
          {shippingInfo.map((info, index) => (
            <div key={index} className="Shipping-Info">
              <span>{info.label}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
      </section>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
