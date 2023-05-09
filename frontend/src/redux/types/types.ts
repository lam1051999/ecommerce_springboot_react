import { PathLink } from "../../constants/type";

export type ChoiceBarState = {
  productType: string;
  productSubType: string | null;
  sortType: string;
  page: number;
  numPage: number;
};

export type BreadScrumbState = {
  listPath: PathLink[];
};

export type ProductImagesState = {
  color: string;
  list_images: string[];
  showcase_image: string;
};

export type ProductsQueryArgs = {
  sort_type: string;
  product_type: string;
  product_sub_type: string | null;
  page: number;
  size: number;
};

export type ProductSearchQueryArgs = {
  sort_type: string;
  page: number;
  size: number;
  search_text: string;
};

export type ProductsDto = {
  total_pages: number;
  total_elements: number;
  list_products: ProductsEntity[];
};

export type ProductsDtoResponse = {
  message: string;
  status: string;
  data: ProductsDto;
};

export type ProductsEntity = {
  id: string;
  name: string;
  extra_product_type: string;
  extra_strap_type: string;
  extra_gpu_type: string;
  extra_storage_type: string;
  extra_color_type: string;
  extra_ram_type: string;
  extra_model_type: string;
  extra_screen_size: string;
  actual_price: number;
  old_price: number;
  showcase_image: string;
  product_type: string;
  product_sub_type: string;
  created: string;
  modified: string;
};

export type ProductsEntityResponse = {
  message: string;
  status: string;
  data: ProductsEntity;
};

export type ProductImagesDto = {
  color: string;
  list_images: string[];
};

export type ProductImagesDtoResponse = {
  message: string;
  status: string;
  data: ProductImagesDto[];
};

export type ProductInfosEntity = {
  id: string;
  product_desc: string;
  product_spec: string;
  product_detail: string;
  product_qna: string;
  product_id: string;
};

export type ProductInfosEntityResponse = {
  message: string;
  status: string;
  data: ProductInfosEntity;
};

export type ProductRatingsEntity = {
  id: string;
  person_name: string;
  review: string;
  num_stars: number;
  created: string;
  modified: string;
  product_id: string;
  username: string;
};

export type ProductRatingsDto = {
  num_reviews: number;
  average_num_stars: number;
  num_5_stars: number;
  num_4_stars: number;
  num_3_stars: number;
  num_2_stars: number;
  num_1_stars: number;
  list_reviews: ProductRatingsEntity[];
};

export type ProductRatingsDtoResponse = {
  message: string;
  status: string;
  data: ProductRatingsDto;
};

export type DetailProductsById = ProductsEntity & {
  list_colors: ProductImagesDto[];
  specifications: ProductInfosEntity;
};

export type ProductRatingsRequest = {
  person_name: string;
  review: string;
  num_stars: number;
  created: string;
  product_id: string;
};

export type ProductRatingsResponse = {
  message: string;
  status: string;
  data: string;
};

export type ShoppingCartItem = {
  products_entity: ProductsEntity;
  quantity: number;
};

export type ShoppingCart = {
  cartItems: ShoppingCartItem[];
};

export type ShopdunkShopsEntity = {
  id: string;
  name: string;
  province_id: string;
};

export type ProvinceAddressDto = {
  id: string;
  province_name: string;
  district_name: string;
  list_shops: ShopdunkShopsEntity[];
};

export type ProvincesAndShopsResponse = {
  status: string;
  message: string;
  data: ProvinceAddressDto[];
};

export type AuthenticationResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    refresh_token: string;
  };
};

export type RegisterBody = {
  name: string;
  gender: string;
  dob: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
};

export type AuthenticateBody = {
  username: string;
  password: string;
};

export type AuthenticationState = {
  token: string | null;
  refresh_token: string | null;
};

export type CustomerInfosRequest = {
  name: string;
  gender: string;
  dob: string;
  phone_number: string;
  email: string;
};

export type CustomerInfosData = CustomerInfosRequest & {
  username: string;
};

export type CustomerInfosResponse = {
  status: string;
  message: string;
  data: CustomerInfosData;
};

export type MessageResponse = {
  status: string;
  message: string;
  data: string;
};

export type CustomBaseQueryError = {
  status: number | undefined;
  data: {};
};

export type CustomerShipAddressesRequest = {
  name: string;
  phone_number: string;
  email: string;
  exact_address: string;
  province_id: string;
};

export type CustomerShipAddressesEntity = CustomerShipAddressesRequest & {
  id: string;
  username: string;
};

export type CustomerShipAddressesResponse = {
  status: string;
  message: string;
  data: CustomerShipAddressesEntity[];
};

export type SingleCustomerShipAddressesResponse = {
  status: string;
  message: string;
  data: CustomerShipAddressesEntity;
};

export type PasswordChangeRequest = {
  old_password: string;
  new_password: string;
};

export type CustomerAvatarDto = {
  avatar: string;
};

export type CustomerAvatarResponse = {
  status: string;
  message: string;
  data: CustomerAvatarDto;
};

export type ShoppingCartItemNormalized = {
  product_id: string;
  name: string;
  quantity: number;
};

export type OrdersRequest = {
  receive_type: string;
  total_price: number;
  is_extract_receipt: number;
  payment: string;
  ship_address_id: string;
  list_products_in_order: ShoppingCartItemNormalized[];
};

export type OrdersEntity = {
  id: string;
  created: string;
  modified: string;
  receive_type: string;
  total_price: number;
  is_extract_receipt: number;
  payment: string;
  orders_status: string;
  payment_status: string;
  username: string;
  ship_address_id: string;
};

export type OrdersResponse = {
  status: string;
  message: string;
  data: OrdersEntity[];
};

export type OrdersByIdDto = {
  order_detail: OrdersEntity;
  ship_address_detail: CustomerShipAddressesEntity;
  ordered_items: ShoppingCartItem[];
};

export type OrdersByIdReponse = {
  status: string;
  message: string;
  data: OrdersByIdDto;
};

export type ProductRatingsByUser = {
  rating_detail: ProductRatingsEntity;
  product_detail: ProductsEntity;
};

export type ProductRatingsByUserResponse = {
  status: string;
  message: string;
  data: ProductRatingsByUser[];
};
