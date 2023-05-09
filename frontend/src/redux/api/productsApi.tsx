import { createApi } from "@reduxjs/toolkit/query/react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import {
  DetailProductsById,
  ProductImagesDtoResponse,
  ProductInfosEntityResponse,
  ProductRatingsDtoResponse,
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
              } else {
                dispatch(onResetProductImages());
              }
              return { data: resolvedData };
            }
          )
          .catch((err) => {
            return {
              error: err,
            };
          });
      },
    }),
    getProductRatingsById: builder.query<ProductRatingsDtoResponse, string>({
      query: (product_id) => ({
        url: "/product-ratings",
        method: "get",
        params: { product_id },
      }),
      providesTags: ["ProductRatingsById"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByIdQuery,
  useGetProductRatingsByIdQuery,
} = productsApi;
