import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import "../../CSS/shopping-view/Checkout/CheckoutCart.css";
import { useNavigate } from "react-router-dom";
import CheckOutItemCard from "../../../components/shopping-view/CheckOut/CheckOutItemCard";
import ShopProductContext from "../../../context/ShopProductContext";

function CheckoutCart() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();

  const {
    isCompleted,
    setisCompleted,
    setCurrentStep,
    selectedShippingOption,
    setSelectedShippingOption,
    setshipmentValue,
    calculateSubTotal,
    calculateTotal,
  } = useContext(ShopProductContext);

  function handleShippingChange(option) {
    setSelectedShippingOption(option);
  }

  function handleCheckout() {
    if (cartItems && cartItems.items && cartItems.items.length > 0) {
      setisCompleted(true);
      if (isCompleted) {
        setCurrentStep(2);
      }
      navigate("/shop/checkout/details");
    } else {
      alert("Please add items to the cart to proceed.");
    }
  }

  return (
    <div className="CheckoutCart-container">
      <div className="CheckoutCart-container-details">
        <ul>
          <li>Product</li>
          <li>Quantity</li>
          <li>Price</li>
          <li>Subtotal</li>
        </ul>
        <div className="CheckoutCart-main-container">
          {cartItems && cartItems.items && cartItems.items.length > 0 ? (
            cartItems.items.map((item) => (
              <CheckOutItemCard key={item.id} item={item} />
            ))
          ) : (
            <p className="checkout-cart-empty">Your cart is empty.</p>
          )}
        </div>
      </div>
      <div className="cart-summary">
        <h2>Cart summary</h2>
        <div className="cart-summary-head">
          <div
            className="radio-container"
            onClick={() => {
              handleShippingChange("free");
              setshipmentValue(0.0);
            }}
          >
            <div className="input-radio">
              <input
                type="radio"
                name="free"
                checked={selectedShippingOption === "free"}
                onChange={handleShippingChange}
              />
              <span>Free Shipping</span>
            </div>
            <div className="shipmentCharge">
              <span>$0.00</span>
            </div>
          </div>
          <div
            className="radio-container"
            onClick={() => {
              handleShippingChange("express");
              setshipmentValue(15.0);
            }}
          >
            <div className="input-radio">
              <input
                type="radio"
                name="shipping"
                checked={selectedShippingOption === "express"}
                onChange={handleShippingChange}
              />
              <span>Express Shipping</span>
            </div>
            <div className="shipmentCharge">
              <span>+$15.00</span>
            </div>
          </div>
          <div
            className="radio-container"
            onClick={() => {
              handleShippingChange("pickup");
              setshipmentValue(0.21 * calculateSubTotal);
            }}
          >
            <div className="input-radio">
              <input
                type="radio"
                name="shipping"
                checked={selectedShippingOption === "pickup"}
                onChange={handleShippingChange}
              />
              <span>Pick Up</span>
            </div>
            <div className="shipmentCharge">
              <span>%21.00</span>
            </div>
          </div>
        </div>
        <div className="cart-summary-footer">
          <div className="subtotal">
            <h3>Subtotal</h3>
            <span>${calculateSubTotal.toFixed(2)}</span>
          </div>
          <div className="totalPrice">
            <h3>Total</h3>
            <span>${calculateTotal.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCart;
