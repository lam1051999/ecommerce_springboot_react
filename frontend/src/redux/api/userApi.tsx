import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { axiosAuthBaseQuery } from "../custom/baseQuery";
import {
  CustomerAvatarResponse,
  CustomerInfosRequest,
  CustomerInfosResponse,
  CustomerShipAddressesRequest,
  CustomerShipAddressesResponse,
  MessageResponse,
  OrdersByIdReponse,
  OrdersRequest,
  OrdersResponse,
  PasswordChangeRequest,
  ProductRatingsByUserResponse,
  ProductRatingsRequest,
  ShoppingCartChangeRequest,
  ShoppingCartResponse,
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
    "CustomerAvatar",
    "CustomerOrders",
    "ShoppingCart",
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
    updateCustomerPassword: builder.mutation<
      MessageResponse,
      PasswordChangeRequest
    >({
      query: (passwordChangeRequest) => ({
        url: "/customer-infos/password",
        method: "patch",
        data: passwordChangeRequest,
      }),
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
    updateCustomerAvatar: builder.mutation<MessageResponse, FormData>({
      query: (request) => ({
        url: "/customer-infos/avatar",
        method: "post",
        data: request,
      }),
      invalidatesTags: ["CustomerAvatar"],
    }),
    deleteCustomerAvatar: builder.mutation<MessageResponse, void>({
      query: () => ({
        url: "/customer-infos/avatar",
        method: "delete",
      }),
      invalidatesTags: ["CustomerAvatar"],
    }),
    getCustomerAvatar: builder.query<CustomerAvatarResponse, void>({
      query: () => ({
        url: "/customer-infos/avatar",
        method: "get",
        isNavigateToLogin: false,
      }),
      providesTags: ["CustomerAvatar"],
    }),
    placeOrders: builder.mutation<MessageResponse, OrdersRequest>({
      query: (request) => ({
        url: "/customer-infos/orders",
        method: "post",
        data: request,
      }),
      invalidatesTags: ["CustomerOrders"],
    }),
    getOrders: builder.query<OrdersResponse, void>({
      query: () => ({ url: "/customer-infos/orders", method: "get" }),
      providesTags: ["CustomerOrders"],
    }),
    getOrdersById: builder.query<OrdersByIdReponse, string>({
      query: (id) => ({
        url: `/customer-infos/orders/${id}`,
        method: "get",
      }),
    }),
    createProductRatings: builder.mutation<
      MessageResponse,
      ProductRatingsRequest
    >({
      query: (productRatingsRequest) => ({
        url: "/customer-infos/ratings",
        method: "post",
        data: productRatingsRequest,
      }),
    }),
    getProductRatingsByUser: builder.query<ProductRatingsByUserResponse, void>({
      query: () => ({
        url: `/customer-infos/ratings`,
        method: "get",
      }),
    }),
    getShoppingCartItems: builder.query<ShoppingCartResponse, void>({
      query: () => ({
        url: "/customer-infos/shopping-cart",
        method: "get",
        isNavigateToLogin: false,
      }),
      providesTags: ["ShoppingCart"],
    }),
    changeShoppingCartQuantity: builder.mutation<
      MessageResponse,
      ShoppingCartChangeRequest
    >({
      query: (request) => ({
        url: "/customer-infos/shopping-cart",
        method: "post",
        data: request,
      }),
      invalidatesTags: ["ShoppingCart"],
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
  useUpdateCustomerPasswordMutation,
  useUpdateCustomerAvatarMutation,
  useDeleteCustomerAvatarMutation,
  useGetCustomerAvatarQuery,
  usePlaceOrdersMutation,
  useGetOrdersQuery,
  useGetOrdersByIdQuery,
  useCreateProductRatingsMutation,
  useGetProductRatingsByUserQuery,
  useGetShoppingCartItemsQuery,
  useLazyGetShoppingCartItemsQuery,
  useChangeShoppingCartQuantityMutation,
} = userApi;
