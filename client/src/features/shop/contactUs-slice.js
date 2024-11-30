import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  contactUsMessage: [],
};

export const addNewContactUsMessage = createAsyncThunk(
  "/contactus/addnewcontactmessage",
  async (contactFormData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/shop/contactus/addnewmessage`,
      contactFormData
    );
    return response?.data;
  }
);
export const fetchContactUsMessage = createAsyncThunk(
  "/contactus/fetchContactUsMessage",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/shop/contactus/getallinboxmessage`
    );
    return response?.data;
  }
);

const contactUsSlice = createSlice({
  name: "contactUsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewContactUsMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewContactUsMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactUsMessage = action.payload.data;
      })
      .addCase(addNewContactUsMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.contactUsMessage = [];
      })
      .addCase(fetchContactUsMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactUsMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contactUsMessage = action.payload.data;
      })
      .addCase(fetchContactUsMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.contactUsMessage = [];
      });
  },
});

export default contactUsSlice.reducer;
