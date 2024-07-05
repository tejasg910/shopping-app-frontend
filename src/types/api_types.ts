import { Product, ShippingInfo, User } from "./types";

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
  currPage: number;
  totalPages: number;
};

export type Order = {
  _id: string;
  shippingInfo: ShippingInfo;
  user: {
    name: string;
    _id: string;
    email: string;
    mobile: string;
  };
  subTotal: number;
  discount: number;
  shippingCharges: number;
  status: string;
  products: { product: Product; quantity: number }[];
  quantity: number;
  name: string;
  tax: number;
  total: number;
  paymentStatus: string;
  paymentMode: string;
  createdAt?: Date;
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

export type allUsersResponse = {
  success: boolean;
  message: string;
  data: User[];
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

type orderItems = { product: string; quantity: number };
export type newOrderRequest = {
  shippingInfo: ShippingInfo;
  products: orderItems[];
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

export type dasboardStatisticsResponse = {
  success: boolean;
  message: string;
  data: {
    allCategories: {}[];
    revenue: number;
    percent: {
      revenue: number;
      product: number;
      user: number;
      order: number;
    };
    count: {
      user: number;
      product: number;
      order: number;
    };
    chart: {
      order: [];
      revenue: [];
    };
    genderRatio: {
      male: string;
      female: string;
    };
    transactions: [];
  };
  totalPages: number;
  currPage: number;
};
export type pieChartResponse = {
  success: Boolean;
  message: string;
  data: {
    orderFulFilment: {
      processing: number;
      shipped: number;
      delivered: number;
    };
    stockRatio: number[];
    productsByCategory: { count: number; category: string }[];
    userTypes: string[];
  };
};
export type barChartsDataResponse = {
  success: Boolean;
  data: {
    order: number[];
    users: number[];
    products: number[];
  };
};
