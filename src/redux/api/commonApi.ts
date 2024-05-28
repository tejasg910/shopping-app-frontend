import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  OrderDetailResponse,
  allCategoriesResponse,
  getPrdouctByIdResponse,
  latestProductsResponse,
  searchProductQuery,
  searchProductsResponse,
} from "../../types/api_types";

export const commonApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["order"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/common/`,
  }),

  endpoints: (builder) => ({
    orderDetail: builder.query<
      OrderDetailResponse,
      { id: string; orderId: string }
    >({
      query: ({ id, orderId }) => `/order/orderDetails/${orderId}?id=${id}`,
      providesTags: ["order"],
    }),
    getLatestProducts: builder.query<latestProductsResponse, string>({
      query: () => "/product/latest",
    }),
    getAllCategories: builder.query<allCategoriesResponse, string>({
      query: () => "/product/categories",
    }),
    getProductById: builder.query<getPrdouctByIdResponse, string>({
      query: (id) => `/product/${id}`,
    }),

    searchProducts: builder.query<searchProductsResponse, searchProductQuery>({
      query: ({ search, page, category, price, sort }) => {
        let base = `/product/search?search=${search}&page=${page}`;

        if (sort) base += `&sort=${sort}`;
        if (category) base += `&category=${category}`;
        if (price) base += `&price=${price}`;

        return base;
      },
    }),
  }),
});

export const {
  useGetLatestProductsQuery,
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useOrderDetailQuery,
} = commonApi;
