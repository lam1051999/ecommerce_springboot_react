import ProfileAccountInfo from "../components/specific/ProfileAccountInfo";
import ProfileAddressInfo from "../components/specific/ProfileAddressInfo";
import { ProfileTabsItem } from "./type";
import { FaUserAlt, FaMapMarkerAlt, FaLock, FaHistory } from "react-icons/fa";
import { BsCartFill, BsGiftFill, BsImage } from "react-icons/bs";
import ProfileOrdersInfo from "../components/specific/ProfileOrdersInfo";
import ProfileRewardedPointsInfo from "../components/specific/ProfileRewardedPointsInfo";
import ProfilePasswordInfo from "../components/specific/ProfilePasswordInfo";
import ProfileAvatarInfo from "../components/specific/ProfileAvatarInfo";
import ProfileRatingHistoryInfo from "../components/specific/ProfileRatingHistoryInfo";

export const profileTabs: ProfileTabsItem[] = [
  {
    key: "ACCOUNT_INFO",
    title: "Thông tin tài khoản",
    icon: <FaUserAlt />,
    component: <ProfileAccountInfo />,
  },
  {
    key: "ADDRESS_INFO",
    title: "Địa chỉ nhận hàng",
    icon: <FaMapMarkerAlt />,
    component: <ProfileAddressInfo />,
  },
  {
    key: "ORDERS_INFO",
    title: "Đơn đặt hàng",
    icon: <BsCartFill />,
    component: <ProfileOrdersInfo />,
  },
  {
    key: "REWARDED_POINTS_INFO",
    title: "Điểm thưởng",
    icon: <BsGiftFill />,
    component: <ProfileRewardedPointsInfo />,
  },
  {
    key: "PASSWORD_INFO",
    title: "Đổi mật khẩu",
    icon: <FaLock />,
    component: <ProfilePasswordInfo />,
  },
  {
    key: "AVATAR_INFO",
    title: "Ảnh đại diện",
    icon: <BsImage />,
    component: <ProfileAvatarInfo />,
  },
  {
    key: "RATING_HISTORY_INFO",
    title: "Lịch sử đánh giá sản phẩm",
    icon: <FaHistory />,
    component: <ProfileRatingHistoryInfo />,
  },
];
