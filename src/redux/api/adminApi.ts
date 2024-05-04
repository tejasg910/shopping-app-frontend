import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allProductsResponse,
  deleteProductRequest,
  messageResponse,
  newProductRequest,
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
export const adminApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/admin/`,
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<allProductsResponse, string>({
      query: (id) => `/product/getAll?id=${id}`,
      providesTags: ["product"],
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

      async onQueryStarted(_, { dispatch }) {
        await dispatch(refetchLatestProducts());
      },
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
  }),
});

export const {
  useGetAllProductsQuery,
  useNewProductMutation,
  useUdpateProductMutation,
  useDeleteProductMutation,
} = adminApi;
