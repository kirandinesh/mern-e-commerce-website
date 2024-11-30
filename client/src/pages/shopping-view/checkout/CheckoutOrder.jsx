import React, { useContext, useEffect } from "react";
import "../../CSS/shopping-view/Checkout/CheckoutOrder.css";
import { Card, CardActions, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../../features/shop/order-slice";
import { useLocation, useNavigate } from "react-router-dom";
import ShopProductContext from "../../../context/ShopProductContext";

function CheckoutOrder() {
  const { isCompleted, setisCompleted, currentStep, setCurrentStep } =
    useContext(ShopProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { orderDetail } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  console.log(currentStep, "currentStepcurrentStep");
  console.log(window.location.pathname, "currentStepcurrentStep");
  useEffect(() => {
    setCurrentStep(4);
  }, [orderDetail, isCompleted, setisCompleted, setCurrentStep]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);
  return (
    <Card
      style={{
        maxWidth: "728px",
        margin: "20px auto",
        padding: "20px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="order-card-content">
          <div className="order-title">
            <h3>Thank you! 🎉</h3>
            <h2>
              Your order has been <br /> received
            </h2>
          </div>

          <div className="image-container">
            <div className="order-image-container">
              {orderDetail?.cartItems?.map((items, index) => (
                <div className="order-image-holder" key={index}>
                  <div className="order-image">
                    <img src={items.image} alt="productImage" />
                  </div>
                  <span>{items.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-details">
            <div className="order-details-left">
              <ul>
                <li>Order Code:</li>
                <li>Date:</li>
                <li>Total:</li>
                <li>Payment Method:</li>
              </ul>
            </div>
            <div className="order-details-right">
              <ul>
                <li> {orderDetail?._id}</li>
                <li>{orderDetail?.orderDate?.split("T")[0]}</li>
                <li>${orderDetail?.totalAmount}</li>
                <li>{orderDetail?.paymentMethod}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="purchase-history"
          onClick={() => navigate("/shop/account")}
        >
          Purchase history
        </button>
      </CardActions>
    </Card>
  );
}

export default CheckoutOrder;
