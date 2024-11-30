import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewProducts",
  async (formData) => {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/admin/products/add`,
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

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/admin/products/edit/${id}`,
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

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllProduct",
  async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/admin/products/get`
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductSlice.reducer;
