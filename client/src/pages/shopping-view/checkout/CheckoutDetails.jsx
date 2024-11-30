import React, { Fragment, useContext, useState, useEffect } from "react";
import "../../CSS/shopping-view/Checkout/CheckoutDetails.css";
import UserCartWrapper from "../../../components/shopping-view/cart-wrapper";
import { useDispatch, useSelector } from "react-redux";
import ShopProductContext from "../../../context/ShopProductContext";
import { TicketPercent } from "lucide-react";
import AddressFormContainer from "../../../components/shopping-view/Address-form-container";
import { addAddress } from "../../../features/shop/address-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../../../config";
import { createNewOrder } from "../../../features/shop/order-slice";

function CheckoutDetails() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const {
    selectedShippingOption,
    calculateSubTotal = 0,
    calculateTotal = 0,
    active,
    setactive,
    initialFormData,
    formData,
    setFormData,
    selectedPaymentOption,
    setSelectedPaymentOption,
    setisCompleted,
    setCurrentStep,
  } = useContext(ShopProductContext);

  const [coupon, setcoupon] = useState("");
  const [couponText, setcouponText] = useState("");
  const [checkoutFormData, setcheckoutFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { approvalURL } = useSelector((state) => state.shopOrder);

  const option =
    selectedShippingOption.charAt(0).toUpperCase() +
    selectedShippingOption.slice(1);

  const { user } = useSelector((state) => state.auth);

  function handleCouponChange(value) {
    setcoupon(value);
  }
  console.log(cartItems, "cartItemscartItemscartItems");

  function handleCouponApply() {
    if (coupon.trim().length > 0) {
      setcouponText(coupon.trim());
      setcoupon("");
    } else {
      alert("Please enter a valid coupon code.");
    }
  }

  function handleCouponRemove() {
    setcouponText("");
  }

  function handleCheckbox(valid) {
    setactive(valid);
  }

  function handleFormChange(e) {
    const { name, value } = e.target;
    setcheckoutFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePaymentMethod(option) {
    setSelectedPaymentOption(option);
  }

  // Check if form is valid
  function isFormValid() {
    // Check if all fields are filled and if a payment method is selected
    const isContactInfoValid =
      checkoutFormData.first.trim() !== "" &&
      checkoutFormData.last.trim() !== "" &&
      checkoutFormData.phone.trim() !== "" &&
      checkoutFormData.email.trim() !== "";

    const isShippingAddressValid =
      checkoutFormData.address.trim() !== "" &&
      checkoutFormData.country.trim() !== "" &&
      checkoutFormData.city.trim() !== "" &&
      checkoutFormData.state.trim() !== "" &&
      checkoutFormData.pincode.trim() !== "";

    const isPaymentMethodSelected = selectedPaymentOption !== "";

    return (
      isContactInfoValid && isShippingAddressValid && isPaymentMethodSelected
    );
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        productTitle: item?.productTitle,
        image: item?.image[0],
        price: item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: { ...checkoutFormData },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: calculateTotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    console.log(orderData, "orderData");

    if (cartItems && cartItems.items && cartItems.items.length > 0) {
      setisCompleted(true);
      setCurrentStep(3);
    }

    dispatch(createNewOrder(orderData))
      .then((data) => {
        if (data?.payload?.success) {
          setIsPaymentStart(true);
        } else {
          setIsPaymentStart(false);
        }
        console.log(data, "created order");
      })
      .catch((err) => {});

    dispatch(
      addAddress({
        ...checkoutFormData,
        userId: user?.id,
        notes: "Additional info here",
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setcheckoutFormData(initialFormData);
        toast.success("ADDRESS ADDED SUCCESSFULLY", toastOptions);
      }
    });

    console.log("Order submitted:", checkoutFormData);
  }

  console.log("Order submitted:", setFormData);
  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="CheckoutDetails-main-container">
      <div className="CheckoutDetails-lett-container">
        <form onSubmit={handleFormSubmit}>
          <section className="CheckoutDetails-contact-details">
            <h2>Contact Information</h2>
            <div className="name-details">
              <div className="CheckoutDetails-form-group">
                <label htmlFor="first">FIRST NAME</label>
                <input
                  name="first"
                  type="text"
                  placeholder="First Name"
                  value={checkoutFormData.first}
                  onChange={handleFormChange}
                />
              </div>
              <div className="CheckoutDetails-form-group">
                <label htmlFor="last">LAST NAME</label>
                <input
                  name="last"
                  type="text"
                  placeholder="Last Name"
                  value={checkoutFormData.last}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="other-details">
              <div className="CheckoutDetails-form-group">
                <label htmlFor="phone">PHONE NUMBER</label>
                <input
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  value={checkoutFormData.phone}
                  onChange={handleFormChange}
                />
              </div>
              <div className="CheckoutDetails-form-group">
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={checkoutFormData.email}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          </section>
          <section className="CheckoutDetails-shipping-address">
            {active ? (
              <>
                <h3>ADD NEW ADDRESS</h3>
                <AddressFormContainer
                  formData={formData}
                  setFormData={setFormData}
                />
              </>
            ) : (
              <div className="checkForm">
                <h2>Shipping Address</h2>
                <div className="CheckoutDetails-form-group">
                  <label htmlFor="address">STREET ADDRESS</label>
                  <input
                    name="address"
                    type="text"
                    placeholder="Street Address"
                    value={checkoutFormData.address}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="CheckoutDetails-form-group">
                  <label htmlFor="country">COUNTRY</label>
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    value={checkoutFormData.country}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="CheckoutDetails-form-group">
                  <label htmlFor="city">TOWN / CITY</label>
                  <input
                    name="city"
                    type="text"
                    placeholder="Town / City"
                    value={checkoutFormData.city}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="CheckoutDetails-group-flex">
                  <div className="CheckoutDetails-form-group">
                    <label htmlFor="state">STATE</label>
                    <input
                      name="state"
                      type="text"
                      placeholder="State"
                      value={checkoutFormData.state}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="CheckoutDetails-form-group">
                    <label htmlFor="pincode">ZIP CODE</label>
                    <input
                      name="pincode"
                      type="text"
                      placeholder="Zip Code"
                      value={checkoutFormData.pincode}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="optional-check">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      handleCheckbox(e.target.checked);
                    }}
                  />
                  <span>Use a different billing address (optional)</span>
                </div>
              </div>
            )}
          </section>
          <section className="CheckoutDetails-payment-method">
            <h2>Payment Method</h2>
            <div className="payment-method-container">
              <div
                className="payment-method"
                onClick={() => handlePaymentMethod("paybycard")}
              >
                <div className="payment-method-input">
                  <input
                    type="radio"
                    name="paybycard"
                    checked={selectedPaymentOption === "paybycard"}
                    onChange={handlePaymentMethod}
                  />
                  <label htmlFor="">Pay by Card Credit</label>
                </div>
                <div className="payment-method-icon"></div>
              </div>
              <div
                className="payment-method"
                onClick={() => handlePaymentMethod("paypal")}
              >
                <div className="payment-method-input">
                  <input
                    type="radio"
                    name="paypal"
                    checked={selectedPaymentOption === "paypal"}
                    onChange={handlePaymentMethod}
                  />
                  <label htmlFor="">Paypal</label>
                </div>
                <div className="payment-method-icon"></div>
              </div>
            </div>
            {selectedPaymentOption === "paybycard" ? (
              <Fragment>
                <div className="CheckoutDetails-form-group">
                  <label htmlFor="">CARD NUMBER</label>
                  <input type="text" placeholder="1234 1234 1234" />
                </div>
                <div className="CheckoutDetails-payment-flex">
                  <div className="CheckoutDetails-form-group">
                    <label htmlFor="">EXPIRATION DATE</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="CheckoutDetails-form-group">
                    <label htmlFor="">CVV</label>
                    <input type="text" placeholder="CVC Code" />
                  </div>
                </div>
              </Fragment>
            ) : (
              ""
            )}
          </section>
          <button type="submit" disabled={!isFormValid()}>
            {isPaymentStart ? "Processing Payment " : "Place Order"}
          </button>
        </form>
      </div>
      <div className="CheckoutDetails-right-container">
        <section className="CheckoutDetails-cart-summary">
          <h2>Order Summary</h2>
          <div className="CheckoutDetails-cart">
            {cartItems && cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((item) => (
                <UserCartWrapper key={item.productId} cartItems={item} />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="coupon-container">
            <input
              type="text"
              name="coupon"
              placeholder="Input"
              value={coupon}
              onChange={(e) => handleCouponChange(e.target.value)}
            />
            <button onClick={handleCouponApply}>Apply</button>
          </div>
          <div className="CheckoutDetails-price-details">
            <div className="coupon-details">
              <div className="coupons-details-left">
                <TicketPercent />
                <span>{couponText}</span>
              </div>
              <div className="coupons-details-right">
                <span></span>
                <button onClick={handleCouponRemove}>[remove]</button>
              </div>
            </div>
            <div className="shipping-details">
              <h4>Shipping</h4>
              <span>{option}</span>
            </div>
            <div className="subtotal-details">
              <h4>Subtotal</h4>
              <span>${calculateSubTotal.toFixed(2)}</span>
            </div>
            <div className="total-details">
              <h4>Total</h4>
              <span>${calculateTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CheckoutDetails;
