import { configureStore } from "@reduxjs/toolkit";
import { userAuthSlice } from "./reducers/userReducers.js";
import { productslice } from "./reducers/productReducers.js";
import { cartSlice } from "./reducers/cartReducers.js";

export const Store = configureStore({
  reducer: {
    user: userAuthSlice.reducer,
    products: productslice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});
