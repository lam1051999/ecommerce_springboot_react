import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { axiosAuthBaseQuery } from "../custom/baseQuery";
import {
  CustomerInfosRequest,
  CustomerInfosResponse,
  CustomerShipAddressesRequest,
  CustomerShipAddressesResponse,
  MessageResponse,
  SingleCustomerShipAddressesResponse,
} from "../types/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosAuthBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: [
    "CustomerInfos",
    "CustomerShipAddresses",
    "CustomerShipAddressesById",
  ],
  endpoints: (builder) => ({
    getCustomerInfos: builder.query<CustomerInfosResponse, void>({
      query: () => ({ url: "/customer-infos/account", method: "get" }),
      providesTags: ["CustomerInfos"],
    }),
    updateCustomerInfos: builder.mutation<
      MessageResponse,
      CustomerInfosRequest
    >({
      query: (customerInfosData) => ({
        url: "/customer-infos/account",
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
    getCustomerShipAddressesById: builder.query<
      SingleCustomerShipAddressesResponse,
      string
    >({
      query: (id) => ({
        url: `/customer-infos/ship-addresses/${id}`,
        method: "get",
      }),
      providesTags: ["CustomerShipAddressesById"],
    }),
    updateCustomerShipAddressesById: builder.mutation<
      MessageResponse,
      CustomerShipAddressesRequest & { id: string }
    >({
      query: (request) => ({
        url: `/customer-infos/ship-addresses/${request.id}`,
        method: "patch",
        data: request,
      }),
      invalidatesTags: ["CustomerShipAddressesById"],
    }),
  }),
});

export const {
  useGetCustomerInfosQuery,
  useUpdateCustomerInfosMutation,
  useGetCustomerShipAddressesQuery,
  useCreateCustomerShipAddressesMutation,
  useDeleteCustomerShipAddressesMutation,
  useGetCustomerShipAddressesByIdQuery,
  useUpdateCustomerShipAddressesByIdMutation,
} = userApi;
