import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Shopheader from "./Shopheader";
import "./css/ShopLayout.css";
import ShopFooter from "./ShopFooter";
function ShopLayout() {
  const location = useLocation();
  return (
    <div className="shop-layout-container">
      <div className="shop-header">
        <Shopheader />
        <main className="shop-main">
          <Outlet />
        </main>
        <footer>
          {!location.pathname.includes("shop/payment-processing") && (
            <ShopFooter />
          )}
        </footer>
      </div>
    </div>
  );
}

export default ShopLayout;
