import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  UpdateOrderRequest,
  allProductsResponse,
  allUsersResponse,
  barChartsDataResponse,
  deleteProductRequest,
  messageResponse,
  myOrderResponse,
  newProductRequest,
  pieChartResponse,
  updateProductRequest,
} from "../../types/api_types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useGetLatestProductsQuery } from "./commonApi";
export const refetchLatestProducts = createAsyncThunk(
  "adminApi/refetchLatestProducts",
  async (_) => {
    // Dispatch the getLatestProducts query to refetch the latest products
    useGetLatestProductsQuery("");
  }
);
// export const refetchAllOrders = createAsyncThunk(
//   "adminApi/refetchAllOrders",
//   async (_) => {
//     // Dispatch the getLatestProducts query to refetch the latest products
//     useGetAllOrdersQuery("");
//   }
// );
export const adminApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin/`,
  }),
  tagTypes: ["product", "order"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<allProductsResponse, string>({
      query: (id) => `/product/getAll?id=${id}`,
      providesTags: ["product"],
    }),

    getAllUsers: builder.query<
      allUsersResponse,
      { userId: string; page: number }
    >({
      query: ({ userId, page }) => `/user/all?id=${userId}&page=${page}`,
      providesTags: ["product"],
    }),
    getAllOrders: builder.query<
      myOrderResponse,
      { userId: string; page: number }
    >({
      query: ({ userId, page }) => `/order/allOrders?page=${page}&id=${userId}`,
      providesTags: ["order"],
    }),
    getStatiStics: builder.query<allProductsResponse, string>({
      query: (id) => `/stats/dashboard?id=${id}`,
    }),
    getBarChartData: builder.query<barChartsDataResponse, string>({
      query: (id) => `/stats/bar?id=${id}`,
    }),
    getPieStatistics: builder.query<pieChartResponse, string>({
      query: (id) => `/stats/pie?id=${id}`,
    }),

    newProduct: builder.mutation<messageResponse, newProductRequest>({
      query: ({ formData, id }) => ({
        url: `product/new?id=${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],

      async onQueryStarted(_, { dispatch }) {
        await dispatch(refetchLatestProducts());
      },
    }),
    udpateProduct: builder.mutation<messageResponse, updateProductRequest>({
      query: ({ productId, formData, id }) => ({
        url: `product/update/${productId}?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),

    updateOrderStatus: builder.mutation<messageResponse, UpdateOrderRequest>({
      query: ({ id, status, userId }) => ({
        url: `order/updateOrderStatus/${id}?id=${userId}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
    deleteProduct: builder.mutation<messageResponse, deleteProductRequest>({
      query: ({ productId, id }) => ({
        url: `product/delete/${productId}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],

      // async onQueryStarted(_, { dispatch }) {
      //   await dispatch(refetchLatestProducts());
      // },
    }),
    deleteOrder: builder.mutation<
      messageResponse,
      { id: string; userId: string }
    >({
      query: ({ id, userId }) => ({
        url: `product/delete/${id}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],

      // async onQueryStarted(_, { dispatch }) {
      //   await dispatch(refetchLatestProducts());
      // },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useNewProductMutation,
  useUdpateProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useGetAllUsersQuery,
  useGetStatiSticsQuery,
  useGetBarChartDataQuery,
  useGetPieStatisticsQuery,
} = adminApi;
