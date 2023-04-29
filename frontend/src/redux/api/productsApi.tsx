import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import {
  DetailProductsById,
  ProductImagesDtoResponse,
  ProductInfosEntityResponse,
  ProductRatingsDtoResponse,
  ProductRatingsRequest,
  ProductRatingsResponse,
  ProductsDtoResponse,
  ProductsEntityResponse,
  ProductsQueryArgs,
} from "../types/types";
import { axiosBaseQuery } from "../custom/baseQuery";
import { AxiosError } from "axios";
import { mapProductTypePathLink } from "../../constants/routes";
import { PathLink } from "../../constants/type";
import { onChangeListPath } from "../slices/breadcrumbSlice";
import { onChangeProductColor } from "../slices/productImagesSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  tagTypes: ["ProductsList", "ProductsById", "ProductRatingsById"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsDtoResponse, ProductsQueryArgs>({
      queryFn: async (
        { sort_type, product_type, product_sub_type, page, size },
        { dispatch },
        extraOptions,
        baseQuery
      ) => {
        const requiredParams = {
          sort_type,
          product_type,
          page,
          size,
        };
        const params = product_sub_type
          ? { ...requiredParams, product_sub_type }
          : requiredParams;
        const request = await baseQuery({
          url: "/products",
          method: "get",
          params: params,
        });
        if (request.data) {
          const resolveData = request.data as ProductsDtoResponse;
          return {
            data: resolveData,
          };
        } else {
          return {
            error: request.error as AxiosError,
          };
        }
      },
    }),
    getProductsById: builder.query<DetailProductsById, string>({
      queryFn: async (product_id, { dispatch }, extraOptions, baseQuery) => {
        const params = {
          product_id,
        };
        const productsRequest = baseQuery({
          url: `/products/${product_id}`,
          method: "get",
        });
        const productImagesRequest = baseQuery({
          url: `/product-images`,
          method: "get",
          params: params,
        });
        const productInfosRequest = baseQuery({
          url: `/product-infos`,
          method: "get",
          params: params,
        });
        return Promise.all([
          productsRequest,
          productImagesRequest,
          productInfosRequest,
        ])
          .then(
            ([
              productsResponse,
              productImagesResponse,
              productInfosResponse,
            ]) => {
              const fnProductsResponse =
                productsResponse.data as ProductsEntityResponse;
              const fnProductImagesResponse =
                productImagesResponse.data as ProductImagesDtoResponse;
              const fnProductInfosResponse =
                productInfosResponse.data as ProductInfosEntityResponse;
              const resolvedData: DetailProductsById = {
                ...fnProductsResponse.data,
                list_colors: fnProductImagesResponse.data,
                specifications: fnProductInfosResponse.data,
              };
              const { product_type, name } = fnProductsResponse.data;
              const matchedProductTypePathLink = mapProductTypePathLink.filter(
                (item) => item.productType === product_type
              )[0].pathLink;
              const finalListPath: PathLink[] = [
                matchedProductTypePathLink,
                {
                  title: name,
                  goTo: null,
                },
              ];
              dispatch(onChangeListPath(finalListPath));
              if (fnProductImagesResponse.data.length > 0) {
                dispatch(
                  onChangeProductColor({
                    ...fnProductImagesResponse.data[0],
                    showcase_image:
                      fnProductImagesResponse.data[0].list_images[0],
                  })
                );
              }
              return { data: resolvedData };
            }
          )
          .catch((err) => {
            return {
              error: err as AxiosError,
            };
          });
      },
    }),
    getProductRatingsById: builder.query<ProductRatingsDtoResponse, string>({
      queryFn: async (product_id, { dispatch }, extraOptions, baseQuery) => {
        const params = {
          product_id,
        };
        const res = await baseQuery({
          url: `/product-ratings`,
          method: "get",
          params: params,
        });
        return res.data
          ? { data: res.data as ProductRatingsDtoResponse }
          : { error: res.error as AxiosError };
      },
      providesTags: ["ProductRatingsById"],
    }),
    createProductRating: builder.mutation<
      ProductRatingsResponse,
      ProductRatingsRequest
    >({
      queryFn: async (productRatingRequest, {}, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: "/product-ratings",
          method: "post",
          data: productRatingRequest,
        });
        return res.data
          ? { data: res.data as ProductRatingsResponse }
          : { error: res.error as AxiosError };
      },
      invalidatesTags: ["ProductRatingsById"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useCreateProductRatingMutation,
  useGetProductRatingsByIdQuery,
} = productsApi;
