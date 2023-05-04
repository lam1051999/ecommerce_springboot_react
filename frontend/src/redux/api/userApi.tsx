import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { axiosAuthBaseQuery } from "../custom/baseQuery";
import {
  CustomerInfosRequest,
  CustomerInfosResponse,
  CustomerShipAddressesRequest,
  CustomerShipAddressesResponse,
  MessageResponse,
} from "../types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosAuthBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ["CustomerInfos", "CustomerShipAddresses"],
  endpoints: (builder) => ({
    getCustomerInfos: builder.query<CustomerInfosResponse, void>({
      query: () => ({ url: "/customer-infos", method: "get" }),
      providesTags: ["CustomerInfos"],
    }),
    updateCustomerInfos: builder.mutation<
      MessageResponse,
      CustomerInfosRequest
    >({
      query: (customerInfosData) => ({
        url: "/customer-infos",
        method: "patch",
        data: customerInfosData,
      }),
      invalidatesTags: ["CustomerInfos"],
    }),
    getCustomerShipAddresses: builder.query<
      CustomerShipAddressesResponse,
      void
    >({
      query: () => ({ url: "/customer-infos/ship-addresses", method: "get" }),
      providesTags: ["CustomerShipAddresses"],
    }),
    createCustomerShipAddresses: builder.mutation<
      MessageResponse,
      CustomerShipAddressesRequest
    >({
      query: (customerShipAddressesData) => ({
        url: "/customer-infos/ship-addresses",
        method: "post",
        data: customerShipAddressesData,
      }),
      invalidatesTags: ["CustomerShipAddresses"],
    }),
    deleteCustomerShipAddresses: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `/customer-infos/ship-addresses/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["CustomerShipAddresses"],
    }),
  }),
});

export const {
  useGetCustomerInfosQuery,
  useUpdateCustomerInfosMutation,
  useGetCustomerShipAddressesQuery,
  useCreateCustomerShipAddressesMutation,
  useDeleteCustomerShipAddressesMutation,
} = userApi;
