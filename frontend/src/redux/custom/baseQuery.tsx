import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import { RootState } from "../store/store";
import { onRenewToken, onResetToken } from "../slices/authenticationSlice";
import { AuthenticationResponse } from "../types/types";

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
        },
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
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }, { dispatch, getState }) => {
    const { token, refresh_token } = (getState() as RootState).authentication;
    let result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status === 401) {
      if (refresh_token) {
        const refreshResult = await axios({
          url: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1/auth/refresh-token`,
          method: "post",
          data: { refresh_token: refresh_token },
        });
        if (refreshResult.status === 401 || refreshResult.status === 404) {
          dispatch(onResetToken());
          window.location.href = "/sign-in";
        } else {
          const response = refreshResult.data as AuthenticationResponse;
          dispatch(onRenewToken(response));
          result = await axios({
            url: baseUrl + url,
            method,
            data,
            params,
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
        }
      } else {
        dispatch(onResetToken());
        window.location.href = "/sign-in";
      }
    }
    return result;
  };
