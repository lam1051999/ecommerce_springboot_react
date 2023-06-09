import Home from "../pages/Home";
import { PageRoute, ProductTypePathLink } from "./type";
import IPhone from "../pages/IPhone";
import IPad from "../pages/IPad";
import Mac from "../pages/Mac";
import AppleWatch from "../pages/AppleWatch";
import Sound from "../pages/Sound";
import Accessory from "../pages/Accessory";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import ShoppingCart from "../pages/ShoppingCart";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import SignupResult from "../pages/SignupResult";
import ProfileAccountInfo from "../components/specific/ProfileAccountInfo";
import ProfileAddressInfo from "../components/specific/ProfileAddressInfo";
import ProfileOrdersInfo from "../components/specific/ProfileOrdersInfo";
import ProfileRewardedPointsInfo from "../components/specific/ProfileRewardedPointsInfo";
import ProfilePasswordInfo from "../components/specific/ProfilePasswordInfo";
import ProfileAvatarInfo from "../components/specific/ProfileAvatarInfo";
import ProfileRatingHistoryInfo from "../components/specific/ProfileRatingHistoryInfo";
import AddressesUpdateForm from "../components/specific/AddressesUpdateForm";
import ProfileOrdersDetail from "../components/specific/ProfileOrdersDetail";
import SearchResult from "../pages/SearchResult";
import { ProductType } from "../redux/types/types";

export const ordinaryRoutes: PageRoute[] = [
  {
    path: "/",
    element: <Home />,
    listPath: [
      {
        title: "Trang chủ",
        goTo: null,
      },
    ],
  },
  {
    path: "/iphone",
    element: <IPhone />,
    listPath: [
      {
        title: "iPhone",
        goTo: null,
      },
    ],
  },
  {
    path: "/ipad",
    element: <IPad />,
    listPath: [
      {
        title: "iPad",
        goTo: null,
      },
    ],
  },
  {
    path: "/mac",
    element: <Mac />,
    listPath: [
      {
        title: "Mac",
        goTo: null,
      },
    ],
  },
  {
    path: "/apple-watch",
    element: <AppleWatch />,
    listPath: [
      {
        title: "Watch",
        goTo: null,
      },
    ],
  },
  {
    path: "/sound",
    element: <Sound />,
    listPath: [
      {
        title: "Âm thanh",
        goTo: null,
      },
    ],
  },
  {
    path: "/accessory",
    element: <Accessory />,
    listPath: [
      {
        title: "Phụ kiện",
        goTo: null,
      },
    ],
  },
  {
    path: "/shopping-cart",
    element: <ShoppingCart />,
    listPath: [
      {
        title: "Giỏ hàng",
        goTo: null,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin />,
    listPath: [
      {
        title: "Đăng nhập",
        goTo: null,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <Signup />,
    listPath: [
      {
        title: "Đăng ký",
        goTo: null,
      },
    ],
  },
  {
    path: "/sign-up-result",
    element: <SignupResult />,
    listPath: [
      {
        title: "Đăng ký",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/account",
    element: <ProfileAccountInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/ship-addresses",
    element: <ProfileAddressInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/ship-addresses/edit/:id",
    element: <AddressesUpdateForm />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/orders-history",
    element: <ProfileOrdersInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/orders-history/:orderId",
    element: <ProfileOrdersDetail />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/rewarded-points",
    element: <ProfileRewardedPointsInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/password",
    element: <ProfilePasswordInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/avatar",
    element: <ProfileAvatarInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/customer-infos/ratings-history",
    element: <ProfileRatingHistoryInfo />,
    listPath: [
      {
        title: "Thông tin tài khoản",
        goTo: null,
      },
    ],
  },
  {
    path: "/search",
    element: <SearchResult />,
    listPath: [
      {
        title: "Tìm kiếm",
        goTo: null,
      },
    ],
  },
];

export const specialRoutes: PageRoute[] = [
  {
    path: "/products/:productId",
    element: <ProductDetail />,
    listPath: [],
  },
  {
    path: "*",
    element: <NotFound />,
    listPath: [],
  },
];

export const mapProductTypePathLink: ProductTypePathLink[] = [
  {
    productType: ProductType.IPHONE,
    pathLink: {
      title: "iPhone",
      goTo: "/iphone",
    },
  },
  {
    productType: ProductType.IPAD,
    pathLink: {
      title: "iPad",
      goTo: "/ipad",
    },
  },
  {
    productType: ProductType.MAC,
    pathLink: {
      title: "Mac",
      goTo: "/mac",
    },
  },
  {
    productType: ProductType.WATCH,
    pathLink: {
      title: "Watch",
      goTo: "/apple-watch",
    },
  },
  {
    productType: ProductType.SOUND,
    pathLink: {
      title: "Âm thanh",
      goTo: "/sound",
    },
  },
  {
    productType: ProductType.ACCESSORY,
    pathLink: {
      title: "Phụ kiện",
      goTo: "/accessory",
    },
  },
];

export const routes = [...ordinaryRoutes, ...specialRoutes];
