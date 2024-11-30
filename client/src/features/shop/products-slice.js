import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewProducts",
  async (formData) => {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/shop/products/add`,
      formData,
      {
        headers: {
          "content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    }).toString();

    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shop/products/get/${id}`
    );
    console.log(result, "fetchProductDetails");

    return result?.data;
  }
);

const ShoppingProductSlice = createSlice({
  name: "ShoppingProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.productDetails = null;
      });
  },
});

export default ShoppingProductSlice.reducer;
