import { CartItem, ShippingInfo, User } from "./types";

export interface userReducerInitialState {
  user: User | null;
  loading: boolean;
}
export interface cartReducerInitialState {
  cartItems: CartItem[];
  loading: boolean;
  subTotal: number;
  tax: number;
  shippingCharges: number;
  shippingInfo: ShippingInfo;
  discount: number;
  total: number;
}
