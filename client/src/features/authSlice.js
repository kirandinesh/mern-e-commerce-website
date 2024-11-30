import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (values) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      values,
      { withCredentials: true }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (values) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/login`,
    values,
    { withCredentials: true }
  );
  return response.data;
});
export const logoutUser = createAsyncThunk("/auth/logout", async (values) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});

// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   const response = await axios.get(
//     `${process.env.REACT_APP_API_URL}/api/auth/check-auth`,
//     {
//       withCredentials: true,
//       headers: {
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//       },
//     }
//   );
//   return response.data;
// });

export const checkAuth = createAsyncThunk("/auth/checkauth", async (token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/auth/check-auth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

export const getUsersWithRole = createAsyncThunk("/auth/users", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/auth/users`, // Endpoint for fetching users with role "user"
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenAndCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(getUsersWithRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersWithRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload.success ? action.payload.users : [];
        state.isAuthenticated = true;
      })
      .addCase(getUsersWithRole.rejected, (state, action) => {
        state.isLoading = false;
        state.usersList = [];
      });
  },
});

export default authSlice.reducer;
export const { setUser, resetTokenAndCredentials } = authSlice.actions;
