import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePayment } from "../../features/shop/order-slice";
import "./css/PaymentProcessingPage.css";
import ShopProductContext from "../../context/ShopProductContext";
function PaymentProcessingPage() {
  const { isCompleted, setisCompleted, setCurrentStep, currentStep } =
    useContext(ShopProductContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          setisCompleted(true);
          setCurrentStep(4);
          setTimeout(() => {
            window.location.href = "/shop/checkout/order";
          }, 1000);
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <div className="processing-container">
      <div className="processing">
        payment processing
        <div class="loader">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessingPage;
