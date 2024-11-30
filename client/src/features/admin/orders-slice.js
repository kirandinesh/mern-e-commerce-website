import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  // approvalURL: null,
  // isLoading: false,
  // orderId: null,
  orderList: [],
  orderDetail: null,
};
export const getAllOrdersOfAllUser = createAsyncThunk(
  "order/getAllOrdersOfAllUser",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/admin/order/get`
    );
    return response?.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/admin/order/details/${id}`
    );
    return response?.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/admin/order/update/${id}`,
      {
        orderStatus,
      }
    );
    return response?.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    reserOrderDetailsAdmin: (state) => {
      state.orderDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetail = action.payload.data;
        console.log(action.payload.data, " action.payload.data");
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetail = null;
      });
  },
});
export const { reserOrderDetailsAdmin } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
