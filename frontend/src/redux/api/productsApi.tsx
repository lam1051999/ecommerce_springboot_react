import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import {
  CustomBaseQueryError,
  DetailProductsById,
  ProductImagesByIdRequest,
  ProductImagesDtoResponse,
  ProductInfosEntityResponse,
  ProductRatingsDtoResponse,
  ProductSearchQueryArgs,
  ProductsDtoResponse,
  ProductsEntityResponse,
  ProductsQueryArgs,
} from "../types/types";
import { axiosBaseQuery } from "../custom/baseQuery";
import { mapProductTypePathLink } from "../../constants/routes";
import { PathLink } from "../../constants/type";
import { onChangeListPath } from "../slices/breadcrumbSlice";
import {
  onChangeProductColor,
  onResetProductImages,
} from "../slices/productImagesSlice";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${SHOPDUNK_BACKEND_BASE_URL}/api/v1`,
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ["ProductRatingsById"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsDtoResponse, ProductsQueryArgs>({
      query: ({ sort_type, product_type, product_sub_type, page, size }) => {
        const requiredParams = {
          sort_type,
          product_type,
          page,
          size,
        };
        const params = product_sub_type
          ? { ...requiredParams, product_sub_type }
          : requiredParams;
        return { url: "/products", method: "get", params: params };
      },
    }),
    getProductsById: builder.query<ProductsEntityResponse, string>({
      queryFn: async (product_id, { dispatch }, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `/products/${product_id}`,
          method: "get",
        });
        if (result.data) {
          const resolvedData = result.data as ProductsEntityResponse;
          const { product_type, name } = resolvedData.data;
          const found = mapProductTypePathLink.find(
            (item) => item.productType === product_type
          );
          const matchedProductTypePathLink = found
            ? found.pathLink
            : mapProductTypePathLink[0].pathLink;
          const finalListPath: PathLink[] = [
            matchedProductTypePathLink,
            {
              title: name,
              goTo: null,
            },
          ];
          dispatch(onChangeListPath(finalListPath));
          return { data: resolvedData as ProductsEntityResponse };
        } else {
          return { error: result.error as CustomBaseQueryError };
        }
      },
    }),
    getProductImagesById: builder.query<
      ProductImagesDtoResponse,
      ProductImagesByIdRequest
    >({
      queryFn: async (
        { product_id, main_showcase_image },
        { dispatch },
        extraOptions,
        baseQuery
      ) => {
        const result = await baseQuery({
          url: `/product-images`,
          method: "get",
          params: { product_id },
        });
        if (result.data) {
          const resolvedData = result.data as ProductImagesDtoResponse;
          if (resolvedData.data.length > 0) {
            dispatch(
              onChangeProductColor({
                ...resolvedData.data[0],
                showcase_image: resolvedData.data[0].list_images[0],
              })
            );
          } else {
            dispatch(onResetProductImages(main_showcase_image));
          }
          return { data: resolvedData };
        } else {
          dispatch(onResetProductImages(main_showcase_image));
          return { error: result.error as CustomBaseQueryError };
        }
      },
    }),
    getProductInfosById: builder.query<ProductInfosEntityResponse, string>({
      query: (product_id) => ({
        url: "/product-infos",
        method: "get",
        params: { product_id },
      }),
    }),
    getProductRatingsById: builder.query<ProductRatingsDtoResponse, string>({
      query: (product_id) => ({
        url: "/product-ratings",
        method: "get",
        params: { product_id },
      }),
      providesTags: ["ProductRatingsById"],
    }),
    getProductSearch: builder.query<
      ProductsDtoResponse,
      ProductSearchQueryArgs
    >({
      query: (args) => ({
        url: "/product-search",
        method: "get",
        params: args,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductRatingsByIdQuery,
  useLazyGetProductSearchQuery,
  useGetProductSearchQuery,
  useGetProductImagesByIdQuery,
  useGetProductInfosByIdQuery,
} = productsApi;
