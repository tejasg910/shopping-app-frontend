import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  
  messageResponse,
  myOrderResponse,
  newOrderRequest,
  userResponse,
} from "../../types/api_types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  tagTypes: ["order"],
  endpoints: (builder) => ({
    login: builder.mutation<messageResponse, User>({
      query: (user) => ({
        url: "user/new",
        method: "POST",
        body: user,
      }),
    }),

    newOrder: builder.mutation<messageResponse, newOrderRequest>({
      query: (order) => ({ url: "order/new", method: "POST", body: order }),
      invalidatesTags: ["order"],
    }),
    cancelOrder: builder.query<messageResponse, string>({
      query: (id) => `order/cancel/${id}`,
      providesTags: ["order"],
    }),
    myOrders: builder.query<myOrderResponse, string>({
      query: (id) => `order/myOrders/?id=${id}`,
      providesTags: ["order"],
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/user/getUserById/${id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error, "this is error");
    throw error;
  }
};
export const {
  useLoginMutation,

  useNewOrderMutation,
  useMyOrdersQuery,
} = userApi;
