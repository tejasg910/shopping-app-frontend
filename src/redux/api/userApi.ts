import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import { messageResponse, userResponse } from "../../types/api_types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<messageResponse, User>({
      query: (user) => ({
        url: "user/new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: userResponse } = await axios.get(
      `${import.meta.env.VITE_SERVER}/api/v1/user/user/getUserById/${id}`
    );
    console.log(data)
    return data;
  } catch (error) {
    console.log(error, "this is error")
 throw error;
  }
};
export const { useLoginMutation } = userApi;
