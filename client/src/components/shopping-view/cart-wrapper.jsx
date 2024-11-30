import React, { useState } from "react";
import { X } from "lucide-react";
import "./css/UserCartWrapper.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  updateCartQuantity,
} from "../../features/shop/cart-slice";
import { toast } from "react-toastify";
import { toastOptions } from "../../config";

function UserCartWrapper({ cartItems }) {
  const { user } = useSelector((state) => state.auth);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (!getCartItem || !productList) return;

    const cartProductIndex = productList.findIndex(
      (product) => product._id === getCartItem.productId
    );

    if (cartProductIndex === -1) return; 
    const totalStock = productList[cartProductIndex].totalStock;

    if (typeOfAction === "add" && getCartItem.quantity + 1 > totalStock) {
      toast.warn(`Only ${totalStock} items available in stock`, toastOptions);
      return;
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "add"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, toastOptions);
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItems({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message, toastOptions);
      }
    });
  }
  return (
    <div className="cart-item-container">
      <div className="image-placeholder">
        {cartItems?.image && cartItems?.image?.length > 0 ? (
          <img src={cartItems.image[0]} alt={cartItems.productTitle} />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
      </div>
      <div className="cart-item-details">
        <div className="cart-details">
          <div className="title">{cartItems?.productTitle}</div>
          <div className="color">
            Color: {cartItems?.color || "Not specified"}
          </div>{" "}
          <div className="quantity-selector">
            <button
              className="minusButton"
              onClick={() => handleUpdateQuantity(cartItems, "minus")}
              disabled={cartItems?.quantity === 1}
            >
              -
            </button>
            <h4>{cartItems?.quantity}</h4>
            <button
              className="plusButton"
              onClick={() => handleUpdateQuantity(cartItems, "add")}
            >
              +
            </button>
          </div>
        </div>
        <div className="card-control">
          <div className="price">
            ${(cartItems?.price * cartItems?.quantity).toFixed(2)}
          </div>
          <X onClick={() => handleCartItemDelete(cartItems)} />
        </div>
      </div>
    </div>
  );
}

export default UserCartWrapper;
