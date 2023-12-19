import { createSlice, current } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: true,
  },
  reducers: {
    addtocart(state, action) {
      const { item: cartItem, loading } = action.payload;

      if (cartItem !== undefined) {
        const existingItemIndex = state.cartItems.findIndex((cartItems) => {
          return cartItems.productid == cartItem.productid;
        });

        if (existingItemIndex !== -1)
          state.cartItems[existingItemIndex].quantity = cartItem.quantity;
        else state.cartItems.push(cartItem);
      }
      if (loading !== undefined) state.loading = loading;
    },
    removeFromCart(state, action) {
      const { item: cartItem, loading } = action.payload;

      if (cartItem !== undefined) {
        state.cartItems = state.cartItems.filter(
          (cartItems) => cartItems.productid !== cartItem.productid
        );
      }
      if (loading !== undefined) state.loading = loading;
    },
  },
});

export const { addtocart: mycart, removeFromCart } = cartSlice.actions;
