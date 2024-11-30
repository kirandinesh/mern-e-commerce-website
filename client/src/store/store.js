import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import adminProductSlice from "../features/admin/products-slice";
import adminOrderSlice from "../features/admin/orders-slice";
import ShoppingProductSlice from "../features/shop/products-slice";
import shopCartSlice from "../features/shop/cart-slice";
import shopAddressSlice from "../features/shop/address-slice";
import shopOrderSlice from "../features/shop/order-slice";
import shopSearchSlice from "../features/shop/search-slice";
import shopReiviewSlice from "../features/shop/review-slice";
import shopContactUsSlice from "../features/shop/contactUs-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    adminOrder: adminOrderSlice,
    shoppingProducts: ShoppingProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReiviewSlice,
    shopContactUs: shopContactUsSlice,
  },
});

export default store;
