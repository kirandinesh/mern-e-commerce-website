import React, { useContext, useEffect } from "react";
import "../CSS/shopping-view/checkout.css";
import { Outlet, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { useSelector } from "react-redux";
import ShopProductContext from "../../context/ShopProductContext";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const location = useLocation();
  const { currentStep, setCurrentStep } = useContext(ShopProductContext);
  const stepperControl = [
    { label: "Shopping Cart", id: 1, path: "/checkout/cart" },
    { label: "Checkout Details", id: 2, path: "/checkout/details" },
    { label: "Order Complete", id: 3, path: "/checkout/order" },
  ];

  useEffect(() => {
    if (location.pathname.includes("/checkout/cart")) {
      setCurrentStep(1);
    }
    if (location.pathname.includes("/checkout/details")) {
      setCurrentStep(2);
    }
    if (location.pathname.includes("/checkout/order")) {
      setCurrentStep(4);
    }
  }, [location.pathname]);
  function getStepperClass(stepId) {
    if (cartItems && cartItems.items && cartItems.items.length > 0) {
      if (stepId < currentStep) return "completed";
      if (stepId === currentStep) return "active";
    }
    return "";
  }

  function getCheckOutClass(stepId) {
    if (cartItems && cartItems.items && cartItems.items.length > 0) {
      if (stepId < currentStep) return "progressBar";
      if (stepId === currentStep) return "";
    }
    return "";
  }

  return (
    <div className="shop-checkout-main-container">
      <div className="shop-checkout-container">
        <div className="shop-checkout-header">
          <h1>
            {location.pathname.includes("/checkout/cart")
              ? "Cart"
              : location.pathname.includes("/checkout/details")
              ? "CheckOut"
              : location.pathname.includes("/checkout/order")
              ? "Completed!"
              : ""}
          </h1>
          <div className="checkout-stepper-container">
            {stepperControl.map((item) => (
              <div
                className={`checkout-stepper 
                  ${
                    location.pathname.includes("/checkout/order")
                      ? "progressBar"
                      : ""
                  }
                  ${getCheckOutClass(item.id)}`}
                key={item.id}
              >
                <div
                  className={`stepper ${
                    location.pathname.includes("/checkout/order")
                      ? "completed"
                      : ""
                  }
                  
                  ${getStepperClass(item.id)}`}
                >
                  {(cartItems &&
                    cartItems.items &&
                    cartItems.items.length > 0 &&
                    item.id < currentStep) ||
                  location.pathname.includes("/checkout/order") ? (
                    <Check />
                  ) : (
                    item.id
                  )}
                </div>
                <h3>{item.label}</h3>
              </div>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ShoppingCheckout;
