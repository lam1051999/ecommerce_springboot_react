import { ChoiceItem, DropDownChoiceItem } from "../components/common/types";
import { ProductType, SortType } from "../redux/types/types";

export const iphoneChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.IPHONE,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_IPHONE",
  },
  {
    name: "iPhone 14 series",
    productType: ProductType.IPHONE,
    productSubType: "IPHONE_SUB_TYPE_IPHONE_14_SERIES",
    actionValue: "ACTION_VALUE_IPHONE_14_SERIES",
  },
  {
    name: "iPhone 13 series",
    productType: ProductType.IPHONE,
    productSubType: "IPHONE_SUB_TYPE_IPHONE_13_SERIES",
    actionValue: "ACTION_VALUE_IPHONE_13_SERIES",
  },
  {
    name: "iPhone 12 series",
    productType: ProductType.IPHONE,
    productSubType: "IPHONE_SUB_TYPE_IPHONE_12_SERIES",
    actionValue: "ACTION_VALUE_IPHONE_12_SERIES",
  },
  {
    name: "iPhone 11 series",
    productType: ProductType.IPHONE,
    productSubType: "IPHONE_SUB_TYPE_IPHONE_11_SERIES",
    actionValue: "ACTION_VALUE_IPHONE_11_SERIES",
  },
  {
    name: "iPhone SE",
    productType: ProductType.IPHONE,
    productSubType: "IPHONE_SUB_TYPE_IPHONE_SE_SERIES",
    actionValue: "ACTION_VALUE_IPHONE_SE_SERIES",
  },
];

export const ipadChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.IPAD,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_IPAD",
  },
  {
    name: "iPad Pro M1",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_PRO_M1",
    actionValue: "ACTION_VALUE_IPAD_PRO_M1",
  },
  {
    name: "iPad Pro M2",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_PRO_M2",
    actionValue: "ACTION_VALUE_IPAD_PRO_M2",
  },
  {
    name: "iPad Air",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_AIR",
    actionValue: "ACTION_VALUE_IPAD_AIR",
  },
  {
    name: "iPad 9",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_9",
    actionValue: "ACTION_VALUE_IPAD_9",
  },
  {
    name: "iPad 10",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_10",
    actionValue: "ACTION_VALUE_IPAD_10",
  },
  {
    name: "iPad Mini",
    productType: ProductType.IPAD,
    productSubType: "IPAD_SUB_TYPE_IPAD_MINI",
    actionValue: "ACTION_VALUE_IPAD_MINI",
  },
];

export const macChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.MAC,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_MAC",
  },
  {
    name: "MacBook Pro",
    productType: ProductType.MAC,
    productSubType: "MAC_SUB_TYPE_MACBOOK_PRO",
    actionValue: "ACTION_VALUE_MACBOOK_PRO",
  },
  {
    name: "MacBook Air",
    productType: ProductType.MAC,
    productSubType: "MAC_SUB_TYPE_MACBOOK_AIR",
    actionValue: "ACTION_VALUE_MACBOOK_AIR",
  },
  {
    name: "iMac",
    productType: ProductType.MAC,
    productSubType: "MAC_SUB_TYPE_IMAC",
    actionValue: "ACTION_VALUE_IMAC",
  },
  {
    name: "Mac Mini",
    productType: ProductType.MAC,
    productSubType: "MAC_SUB_TYPE_MAC_MINI",
    actionValue: "ACTION_VALUE_MAC_MINI",
  },
];

export const watchChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.WATCH,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_WATCH",
  },
  {
    name: "Apple Watch Ultra",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_ULTRA",
    actionValue: "ACTION_VALUE_APPLE_WATCH_ULTRA",
  },
  {
    name: "Apple Watch Series 8",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_SERIES_8",
    actionValue: "ACTION_VALUE_APPLE_WATCH_SERIES_8",
  },
  {
    name: "Apple Watch Series 7",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_SERIES_7",
    actionValue: "ACTION_VALUE_APPLE_WATCH_SERIES_7",
  },
  {
    name: "Apple Watch Series 6",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_SERIES_6",
    actionValue: "ACTION_VALUE_APPLE_WATCH_SERIES_6",
  },
  {
    name: "Apple Watch SE",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_SE",
    actionValue: "ACTION_VALUE_APPLE_WATCH_SE",
  },
  {
    name: "Apple Watch Series 3",
    productType: ProductType.WATCH,
    productSubType: "APPLE_WATCH_SUB_TYPE_APPLE_WATCH_SERIES_3",
    actionValue: "ACTION_VALUE_APPLE_WATCH_SERIES_3",
  },
];

export const soundChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.SOUND,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_SOUND",
  },
  {
    name: "AirPods",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_AIRPODS",
    actionValue: "ACTION_VALUE_AIRPODS",
  },
  {
    name: "AirPods Pro",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_AIRPODS_PRO",
    actionValue: "ACTION_VALUE_AIRPODS_PRO",
  },
  {
    name: "EarPods",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_EARPODS",
    actionValue: "ACTION_VALUE_EARPODS",
  },
  {
    name: "Marshall",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_LOA_MARSHALL",
    actionValue: "ACTION_VALUE_LOA_MARSHALL",
  },
  {
    name: "Beats",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_LOA_BEATS",
    actionValue: "ACTION_VALUE_LOA_BEATS",
  },
  {
    name: "Harman Kardon",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_LOA_HARMAN_KARDON",
    actionValue: "ACTION_VALUE_LOA_HARMAN_KARDON",
  },
  {
    name: "JBL",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_LOA_JBL",
    actionValue: "ACTION_VALUE_LOA_JBL",
  },
  {
    name: "Google",
    productType: ProductType.SOUND,
    productSubType: "SOUND_SUB_TYPE_LOA_GOOGLE",
    actionValue: "ACTION_VALUE_LOA_GOOGLE",
  },
];

export const accessoryChoices: ChoiceItem[] = [
  {
    name: "Tất cả",
    productType: ProductType.ACCESSORY,
    productSubType: null,
    actionValue: "ACTION_VALUE_ALL_ACCESSORY",
  },
  {
    name: "Cường lực bảo vệ",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_CUONG_LUC_BAO_VE",
    actionValue: "ACTION_VALUE_CUONG_LUC_BAO_VE",
  },
  {
    name: "Sạc, cáp",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_SAC_CAP",
    actionValue: "ACTION_VALUE_SAC_CAP",
  },
  {
    name: "Bao da/Ốp lưng",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_BAO_DA_OP_LUNG",
    actionValue: "ACTION_VALUE_BAO_DA_OP_LUNG",
  },
  {
    name: "Sạc dự phòng",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_SAC_DU_PHONG",
    actionValue: "ACTION_VALUE_SAC_DU_PHONG",
  },
  {
    name: "Balo/Túi chống sốc",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_BALO_TUI_CHONG_SOC",
    actionValue: "ACTION_VALUE_BALO_TUI_CHONG_SOC",
  },
  {
    name: "Chuột/Bàn phím",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_CHUOT_BAN_PHIM",
    actionValue: "ACTION_VALUE_CHUOT_BAN_PHIM",
  },
  {
    name: "Bút Apple Pencil",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_BUT_APPLE_PENCIL",
    actionValue: "ACTION_VALUE_BUT_APPLE_PENCIL",
  },
  {
    name: "Dây đeo Apple Watch",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_DAY_DEO_APPLE_WATCH",
    actionValue: "ACTION_VALUE_DAY_DEO_APPLE_WATCH",
  },
  {
    name: "AirTags",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_AIRTAGS",
    actionValue: "ACTION_VALUE_AIRTAGS",
  },
  {
    name: "Máy ảnh",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_MAY_ANH",
    actionValue: "ACTION_VALUE_MAY_ANH",
  },
  {
    name: "Máy đọc sách",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_MAY_DOC_SACH",
    actionValue: "ACTION_VALUE_MAY_DOC_SACH",
  },
  {
    name: "Apple TV",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_APPLE_TV",
    actionValue: "ACTION_VALUE_APPLE_TV",
  },
  {
    name: "Đồng hồ Garmin",
    productType: ProductType.ACCESSORY,
    productSubType: "ACCESSORY_SUB_TYPE_DONG_HO_GARMIN",
    actionValue: "ACTION_VALUE_DONG_HO_GARMIN",
  },
];

export const dropdownChoices: DropDownChoiceItem[] = [
  {
    name: "Thứ tự hiển thị",
    actionValue: SortType.RANDOM,
  },
  {
    name: "Giá cao đến thấp",
    actionValue: SortType.PRICE_HIGH_LOW,
  },
  {
    name: "Giá thấp đến cao",
    actionValue: SortType.PRICE_LOW_HIGH,
  },
  {
    name: "Mới nhất",
    actionValue: SortType.NEWEST,
  },
  {
    name: "Tên: A đến Z",
    actionValue: SortType.NAME_A_Z,
  },
  {
    name: "Tên: Z đến A",
    actionValue: SortType.NAME_Z_A,
  },
];
