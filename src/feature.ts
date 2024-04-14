import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "./types/api_types";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

type errorType =
  | {
      data: messageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const showToast = (
  res: errorType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const errorResponse = error.data as messageResponse;
    toast.error(errorResponse.message);
  }
};
