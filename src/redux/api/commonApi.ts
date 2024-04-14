import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allCategoriesResponse,
  latestProductsResponse,
  searchProductQuery,
  searchProductsResponse,
} from "../../types/api_types";
import Search from "../../pages/search";

export const commonApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/common/`,
  }),
  endpoints: (builder) => ({
    getLatestProducts: builder.query<latestProductsResponse, string>({
      query: () => "/product/latest",

    }),
    getAllCategories: builder.query<allCategoriesResponse, string>({
      query: () => "/product/categories",
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
} = commonApi;
