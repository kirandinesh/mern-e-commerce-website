import React, { useState } from "react";
import "../CSS/shopping-view/ShopAccount.css";
import Address from "../../components/shopping-view/Address";
import ShoppingOrders from "../../components/shopping-view/Orders";

function ShoppingAccount() {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          className={`tab-button ${activeTab === "address" ? "active" : ""}`}
          onClick={() => setActiveTab("address")}
        >
          Address
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "orders" && (
          <div className="orders-tab">
            <ShoppingOrders />
          </div>
        )}

        {activeTab === "address" && (
          <div className="address-tab">
            <Address />
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingAccount;
