import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "/review/addProductReview",
  async (formData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/shop/review/add`,
      formData
    );
    return response?.data;
  }
);

export const getProductReviews = createAsyncThunk(
  "/review/getProductReviews",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shop/review/${id}`
    );
    return response?.data;
  }
);
const shopReviewSlice = createSlice({
  name: "ReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
        console.log(action.payload.data, "datadata");
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default shopReviewSlice.reducer;
