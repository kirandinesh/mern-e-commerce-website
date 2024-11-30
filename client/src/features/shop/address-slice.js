import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/addresses/addAddress",
  async (formdata) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/shop/address/add`,
      formdata
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shop/address/get/${userId}`
    );
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formdata }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/shop/address/update/${userId}/${addressId}`,
      formdata
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/shop/address/delete/${userId}/${addressId}`
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllAddresses.fulfilled, (state, action) => {
      state.addressList = action.payload.data;
    });
  },
});

export default addressSlice.reducer;
