import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  isAuthenticated: false,
  error: null,
  isUpdated: false,
  isDeleted: false,
  message: null,
  success: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFail(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    // ... rest of your action reducers
    clearErrors(state) {
      state.error = null;
    },
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfileRequest(state) {
      state.loading = true;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    // ... rest of your profile action reducers
    clearErrors(state) {
      state.error = null;
    },
  },
});

// ... similar slices for other reducers like forgotPassword, allUsers, userDetails

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  clearErrors: clearUserErrors,
  // ... rest of userSlice actions
} = userSlice.actions;

export const {
  updateProfileRequest,
  updateProfileSuccess,
  // ... rest of profileSlice actions
  clearErrors: clearProfileErrors,
} = profileSlice.actions;

// ... export actions for other slices

const reducers = {
  user: userSlice.reducer,
  profile: profileSlice.reducer,
  // ... rest of your reducers
};

export default reducers;
