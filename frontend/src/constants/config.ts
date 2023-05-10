export const SHOPDUNK_BACKEND_BASE_URL = import.meta.env
  .VITE_SHOPDUNK_BACKEND_BASE_URL;

export const SHOPDUNK_IMAGES_BASE_URL = import.meta.env
  .VITE_SHOPDUNK_IMAGES_BASE_URL;

export const NODE_ENV = import.meta.env.VITE_NODE_ENV;

export const NUM_PRODUCTS_PREVIEW = 4;

export const NUM_PRODUCTS_SHOWCASE = 12;

export const NUM_PRODUCTS_SHOWCASE_PAGE_LIMIT = 4;

export const NUM_PRODUCTS_RESULT_PAGE_LIMIT = 5;

export const NUM_SLIDE_IMAGES_SKELETON = 5;

export const MAX_NUM_STARS_RATING = 5;

export const MAX_NUM_PAGE = 999;

export const DEFAULT_PROVINCE = "Chọn tỉnh, thành phố:";
export const DEFAULT_DISTRICT = "Quận, huyện:";
export const DEFAULT_SHOP = "Mời bạn chọn địa chỉ cửa hàng";
export const DEFAULT_ADDRESS = "Địa chỉ mới";

export const DEFAULT_BOD_DATE = "Ngày";
export const DEFAULT_BOD_MONTH = "Tháng";
export const DEFAULT_BOD_YEAR = "Năm";
export const DATE_ARRAY = Array.from(Array(31)).map((item, index) =>
  `${index + 1}`.length < 2 ? `0${index + 1}` : `${index + 1}`
);
export const MONTH_ARRAY = Array.from(Array(12)).map((item, index) =>
  `${index + 1}`.length < 2 ? `0${index + 1}` : `${index + 1}`
);
export const NUM_YEARS = 110;
export const YEAR_ARRAY = Array.from(Array(NUM_YEARS)).map(
  (item, index) => `${new Date().getFullYear() - NUM_YEARS + index + 1}`
);
