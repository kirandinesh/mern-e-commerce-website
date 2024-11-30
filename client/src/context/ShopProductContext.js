import { createContext, useState } from "react";
import { useSelector } from "react-redux";

const ShopProductContext = createContext();

export const ShopProductProvider = ({ children }) => {
  const [gridSelector, setGridSelector] = useState(() => {
    return parseInt(sessionStorage.getItem("gridSelector")) || 0;
  });
  const [isCompleted, setisCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const initialFormData = {
    address: "",
    first: "",
    last: "",
    email: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
    notes: "",
  };
  const { cartItems } = useSelector((state) => state.shopCart);

  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setcurrentEditedId] = useState(null);
  const [selectedShippingOption, setSelectedShippingOption] = useState("free");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("paypal");
  const [shipmentValue, setshipmentValue] = useState(0);
  const [active, setactive] = useState(false);

  const calculateSubTotal =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          return sum + currentItem.price * currentItem.quantity;
        }, 0)
      : 0;

  const calculateTotal = calculateSubTotal + shipmentValue;
  return (
    <ShopProductContext.Provider
      value={{
        gridSelector,
        setGridSelector,
        isCompleted,
        setisCompleted,
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        currentEditedId,
        setcurrentEditedId,
        initialFormData,
        selectedShippingOption,
        setSelectedShippingOption,
        shipmentValue,
        setshipmentValue,
        calculateSubTotal,
        calculateTotal,
        active,
        setactive,
        selectedPaymentOption,
        setSelectedPaymentOption,
      }}
    >
      {children}
    </ShopProductContext.Provider>
  );
};

export default ShopProductContext;
