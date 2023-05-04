import { ProfileTabsItem } from "./type";
import { FaUserAlt, FaMapMarkerAlt, FaLock, FaHistory } from "react-icons/fa";
import { BsCartFill, BsGiftFill, BsImage } from "react-icons/bs";
export const profileTabs: ProfileTabsItem[] = [
  {
    to: "/customer-infos",
    title: "Thông tin tài khoản",
    icon: <FaUserAlt />,
  },
  {
    to: "/customer-infos/ship-addresses",
    title: "Địa chỉ nhận hàng",
    icon: <FaMapMarkerAlt />,
  },
  {
    to: "/customer-infos/orders-history",
    title: "Đơn đặt hàng",
    icon: <BsCartFill />,
  },
  {
    to: "/customer-infos/rewarded-points",
    title: "Điểm thưởng",
    icon: <BsGiftFill />,
  },
  {
    to: "/customer-infos/password",
    title: "Đổi mật khẩu",
    icon: <FaLock />,
  },
  {
    to: "/customer-infos/avatar",
    title: "Ảnh đại diện",
    icon: <BsImage />,
  },
  {
    to: "/customer-infos/ratings-history",
    title: "Lịch sử đánh giá sản phẩm",
    icon: <FaHistory />,
  },
];
