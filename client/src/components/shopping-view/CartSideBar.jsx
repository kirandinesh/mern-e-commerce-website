import { X } from "lucide-react";
import React from "react";
import "./css/CartSideBar.css";
import UserCartItemsContent from "./cart-items-content";

function CartSideBar({ closeSidebar, cartItems, setIsCartOpen }) {
  return (
    <div className="cart-container open">
      <div className="cart-header">
        <h2>Cart</h2>
        <X onClick={closeSidebar} className="close-icon" />
      </div>
      <div className="cart-main-content">
        <UserCartItemsContent
          cartItems={cartItems}
          setIsCartOpen={setIsCartOpen}
        />
      </div>
    </div>
  );
}

export default CartSideBar;
