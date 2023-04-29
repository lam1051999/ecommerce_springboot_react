import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { ProvincesAndShopsResponse } from "../types/types";
import { axiosBaseQuery } from "../custom/baseQuery";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  endpoints: (builder) => ({
    getProvincesAndShops: builder.query<ProvincesAndShopsResponse, void>({
      query: () => ({ url: "/provinces", method: "get" }),
    }),
  }),
});

export const { useGetProvincesAndShopsQuery } = addressApi;
