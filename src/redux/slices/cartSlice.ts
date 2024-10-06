import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartData, TCartState } from "../../types/AllTypes";

const initialState: TCartState = {
  carts: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: TCartState, action: PayloadAction<TCartData>) => {
      state.carts.push(action.payload);
    },
    removeFromCart: (state: TCartState, action: PayloadAction<string>) => {
      state.carts = state.carts.filter((cart) => cart.bikeId != action.payload);
    },
    clearCart: (state: TCartState) => {
      state.carts = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cart.actions;
export const cartReducer = cart.reducer;
