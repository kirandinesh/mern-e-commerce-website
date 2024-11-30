import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthLogin from "./pages/auth/AuthLogin";
import AuthRegister from "./pages/auth/AuthRegister";
import AdminLayout from "./components/admin-view/AdminLayout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AddProducts from "./pages/admin-view/AddProduct";
import AdminFavorites from "./pages/admin-view/favorites";
import AdminInbox from "./pages/admin-view/inbox";
import AdminOrderList from "./pages/admin-view/orderList";
import AdminProductStocks from "./pages/admin-view/productStocks";
import ShopLayout from "./components/shopping-view/ShopLayout";
import ShoppingHome from "./pages/shopping-view/home";
import Shop from "./pages/shopping-view/shop";
import ShoppingProducts from "./pages/shopping-view/products";
import ShoppingContact from "./pages/shopping-view/contact";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCheckout from "./pages/shopping-view/checkoutContainer";
import ShoppingListing from "./pages/shopping-view/listing";
import NotFound from "./pages/not-found/NotFound";
import CheckAuth from "./components/common/CheckAuth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice";
import CheckoutCart from "./pages/shopping-view/checkout/CheckoutCart";
import CheckoutOrder from "./pages/shopping-view/checkout/CheckoutOrder";
import CheckoutDetails from "./pages/shopping-view/checkout/CheckoutDetails";
import SearchPage from "./components/shopping-view/SearchPage/SearchPage";
import PaymentProcessingPage from "./components/shopping-view/PaymentSuccessFullPage";
import Skeleton from "react-loading-skeleton";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Skeleton width="100%" height="100%" />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRole="admin"
            >
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/addproducts" element={<AddProducts />} />
          <Route path="favorites" element={<AdminFavorites />} />
          <Route path="inbox" element={<AdminInbox />} />
          <Route path="orderlist" element={<AdminOrderList />} />
          <Route path="stocks" element={<AdminProductStocks />} />
          <Route path="settings" element={<AdminProductStocks />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
              allowedRole="user"
            >
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="shoplist" element={<Shop />} />
          <Route path="product/:productId" element={<ShoppingProducts />} />
          <Route path="contact" element={<ShoppingContact />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />}>
            <Route path="cart" element={<CheckoutCart />} />
            <Route path="details" element={<CheckoutDetails />} />
            <Route path="order" element={<CheckoutOrder />} />
          </Route>
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="payment-processing"
            element={<PaymentProcessingPage />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
