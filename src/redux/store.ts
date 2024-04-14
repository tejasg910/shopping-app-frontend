import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { commonApi } from "./api/commonApi";
import { adminApi } from "./api/adminApi";
export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

    [userReducer.name]: userReducer.reducer,
  },
  middleware: (mid) =>
    mid().concat(userApi.middleware, commonApi.middleware, adminApi.middleware),
});
