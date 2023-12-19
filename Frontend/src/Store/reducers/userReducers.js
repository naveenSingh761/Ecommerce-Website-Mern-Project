import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    isUpdated: false,
    isDeleted: false,
    message: null, //String
    error: null, //Boolean
    // success: null,
    users: [],
  },
  reducers: {
    Request(state) {
      state.loading = true;
    },
    Success(state, action) {
      //  / Object => user Messages Required

      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user ? action.payload.user : state.user;
      state.message = action.payload.message || state.message;
    },
    Fail(state, action) {
      //  / argument =>  Messages Required

      state.loading = false;
      state.isAuthenticated = false;
      state.error = true;
      state.user = null;
      state.message = action.payload;
    },
    logoutSuccess(state, action) {
      //  / argument =>  Messages Required

      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload.message;
    },
    clearErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

export const { Request, Success, Fail, logoutSuccess, clearError } =
  userAuthSlice.actions;
