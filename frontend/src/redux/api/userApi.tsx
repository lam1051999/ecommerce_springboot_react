import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { axiosAuthBaseQuery } from "../custom/baseQuery";
import { CustomerInfosResponse } from "../types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosAuthBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCustomerInfos: builder.query<CustomerInfosResponse, void>({
      query: () => ({ url: "/customer-infos", method: "get" }),
    }),
  }),
});

export const { useGetCustomerInfosQuery } = userApi;
