import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { RootState } from "../store/store";
import { onRenewToken, onResetToken } from "../slices/authenticationSlice";
import { AuthenticationResponse, CustomBaseQueryError } from "../types/types";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        } as CustomBaseQueryError,
      };
    }
  };

export const axiosAuthBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      extraHeaders?: AxiosRequestConfig["headers"];
      isNavigateToLogin?: boolean;
    },
    unknown,
    unknown
  > =>
  async (
    { url, method, data, params, extraHeaders = {}, isNavigateToLogin = true },
    { dispatch, getState }
  ) => {
    const { token, refresh_token } = (getState() as RootState).authentication;
    const signinRedicrectPath = window.location.pathname.includes("sign-in")
      ? window.location.pathname
      : `/sign-in?returnUrl=${window.location.pathname}`;
    try {
      let result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          ...extraHeaders,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      if (err.response?.status === 401) {
        if (refresh_token) {
          try {
            const refreshResult = await axios({
              url: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1/auth/refresh-token`,
              method: "post",
              data: { refresh_token: refresh_token },
            });
            const response = refreshResult.data as AuthenticationResponse;
            dispatch(onRenewToken(response));
            try {
              let resultRetry = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                  Authorization: `Bearer ${response.data.token}`,
                  ...extraHeaders,
                },
              });
              return { data: resultRetry.data };
            } catch (retryError) {
              let reErr = retryError as AxiosError;
              return {
                error: {
                  status: reErr.response?.status,
                  data: reErr.response?.data || reErr.message,
                },
              };
            }
          } catch (refreshError) {
            dispatch(onResetToken());
            if (
              !window.location.href.includes("sign-in") &&
              isNavigateToLogin
            ) {
              window.location.href = signinRedicrectPath;
            }
          }
        } else {
          dispatch(onResetToken());
          if (!window.location.href.includes("sign-in") && isNavigateToLogin) {
            window.location.href = signinRedicrectPath;
          }
        }
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
