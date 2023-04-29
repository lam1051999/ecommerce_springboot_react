import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import {
  AuthenticateBody,
  AuthenticationResponse,
  RegisterBody,
} from "../types/types";
import { axiosBaseQuery } from "../custom/baseQuery";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthenticationResponse, RegisterBody>({
      query: (body) => ({ url: "/register", method: "post", data: body }),
    }),
    authenticate: builder.mutation<AuthenticationResponse, AuthenticateBody>({
      query: (body) => ({ url: "/authenticate", method: "post", data: body }),
    }),
  }),
});

export const { useRegisterMutation, useAuthenticateMutation } =
  authenticationApi;
