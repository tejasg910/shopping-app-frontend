import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer_types";
import { CartItem } from "../../types/types";
const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  discount: 0,
  tax: 0,
  total: 0,
  shippingCharges: 0,
  shippingInfo: { address: "", city: "", country: "", pinCode: "", state: "" },
  subTotal: 0,
};
export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (itemIndex !== -1) {
        if (
          state.cartItems[itemIndex].stock <=
          state.cartItems[itemIndex].quantity
        )
          return state;

        const itemQuantity = state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1, {
          ...action.payload,
          quantity: itemQuantity + 1,
        });
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },

    decreamentCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (itemIndex !== -1) {
        const itemQuantity = state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1, {
          ...action.payload,
          quantity: itemQuantity - 1,
        });
      }
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },

    calcaulatePricing: (state) => {
      const subTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.subTotal = subTotal;
      const tax = Math.round(subTotal * 0.18);
      const shippingCharges = subTotal > 1000 ? 200 : 0;
      state.total = tax + shippingCharges + subTotal - state.discount;
      state.shippingCharges = shippingCharges;
      state.tax = tax;
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  decreamentCart,
  calcaulatePricing,
  applyDiscount,
} = cartReducer.actions;
