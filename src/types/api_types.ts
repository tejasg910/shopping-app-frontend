import { CartItem, Product, ShippingInfo, User } from "./types";

export type messageResponse = {
  success: boolean;
  message: string;
};

export type userResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type latestProductsResponse = {
  success: boolean;
  message: string;
  data: Product[];
};
export type allCategoriesResponse = {
  success: boolean;
  message: string;
  data: string[];
};

export type myOrderResponse = {
  success: boolean;
  message: string;
  data: Order[];
};

export type Order = {
  _id: string;
  shippingInfo: ShippingInfo;
  user: {
    name: string;
    _id: string;
  };
  subTotal: number;
  discount: number;
  shippingCharges: number;
  status: string;
  product: Product;
  quantity: number;
  name: string;
  tax: number;
  total: number;
};
export type searchProductsResponse = {
  success: boolean;
  message: string;
  data: Product[];
  currPage: number;
  totalPages: number;
};
export type searchProductQuery = {
  search: string;
  page: number;
  category: string;
  sort: string;
  price: number;
};
export type allProductsResponse = {
  success: boolean;
  message: string;
  data: Product[];
  totalPages: number;
  currPage: number;
};
export type getPrdouctByIdResponse = {
  success: boolean;
  message: string;
  data: Product;
};
export type newProductRequest = {
  id: string;
  formData: FormData;
};
export type updateProductRequest = {
  productId: string;
  id: string;
  formData: FormData;
};
export type deleteProductRequest = {
  productId: string;
  id: string;
};

type orderItems = Omit<CartItem, "stock"> & { _id: string };
export type newOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: orderItems[];
  user: string;
  subTotal: number;
  discount: number;
  shippingCharges: number;

  name: string;
  tax: number;
  total: number;
};

export type OrderDetailResponse = {
  success: boolean;
  message: string;
  data: Order;
};

export type UpdateOrderRequest = {
  id: string;
  userId: string;
  status: string;
};
