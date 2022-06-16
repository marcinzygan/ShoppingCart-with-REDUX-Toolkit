import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const resp = await axios(API_URL);
    return resp.data;
  } catch (error) {}
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return itemId !== item.id;
      });
    },
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount = cartItem.amount - 1;
    },
    cartCalcTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount = amount + item.amount;
        total = total + item.amount * item.price;
      });

      state.totalAmount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
console.log(cartSlice);
export const { clearCart, removeItem, increase, decrease, cartCalcTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
