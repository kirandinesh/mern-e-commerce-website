import { X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItems,
  updateCartQuantity,
} from "../../../features/shop/cart-slice";
import { toastOptions } from "../../../config";
import { toast } from "react-toastify";
import "./CheckOutItemCard.css";

function CheckOutItemCard({ item }) {
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
    <div>
      <div key={item.id} className="checkout-cart-card">
        <div className="checkout-cart-card-image">
          <div className="checkout-cart-image">
            <img src={item.image[0]} alt={item.name} />
          </div>
          <div className="checkout-product-details">
            <div className="title">{item?.productTitle}</div>
            <div className="color">Color: {item?.color || "Not specified"}</div>
            <div
              className="remove-checkout"
              onClick={() => handleCartItemDelete(item)}
            >
              <X />
              <span>Remove</span>
            </div>
          </div>
        </div>
        <div className="checkout-cart-details-container">
          <div className="checkout-cart-card-details">{item.name}</div>
          <div className="checkout-cart-quantity">
            <div className="quantity-selector">
              <button
                className="minusButton"
                onClick={() => handleUpdateQuantity(item, "minus")}
                disabled={item?.quantity === 1}
              >
                -
              </button>
              <h4>{item.quantity}</h4>
              <button
                className="plusButton"
                onClick={() => handleUpdateQuantity(item, "add")}
              >
                +
              </button>
            </div>
          </div>
          <div className="checkout-cart-price">${item.price.toFixed(2)}</div>
          <div className="checkout-cart-subtotal">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutItemCard;
