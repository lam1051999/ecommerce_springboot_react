import Home from "../pages/Home";
import { PageRoute, ProductTypePathLink } from "./type";
import IPhone from "../pages/IPhone";
import IPad from "../pages/IPad";
import Mac from "../pages/Mac";
import AppleWatch from "../pages/AppleWatch";
import Sound from "../pages/Sound";
import Accessory from "../pages/Accessory";
import Service from "../pages/Service";
import Information from "../pages/Information";
import Promotion from "../pages/Promotion";
import ProductDetail from "../pages/ProductDetail";
import NotFound from "../pages/NotFound";
import ShoppingCart from "../pages/ShoppingCart";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import SignupResult from "../pages/SignupResult";
import CustomerInfos from "../pages/CustomerInfos";

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
    path: "/service",
    element: <Service />,
    listPath: [
      {
        title: "Dịch vụ",
        goTo: null,
      },
    ],
  },
  {
    path: "/information",
    element: <Information />,
    listPath: [
      {
        title: "Tin tức",
        goTo: null,
      },
    ],
  },
  {
    path: "/promotion",
    element: <Promotion />,
    listPath: [
      {
        title: "Khuyến mại",
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
    path: "/customer-infos",
    element: <CustomerInfos />,
    listPath: [
      {
        title: "Thông tin tài khoản",
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
    productType: "IPHONE",
    pathLink: {
      title: "iPhone",
      goTo: "/iphone",
    },
  },
  {
    productType: "IPAD",
    pathLink: {
      title: "iPad",
      goTo: "/ipad",
    },
  },
  {
    productType: "MAC",
    pathLink: {
      title: "Mac",
      goTo: "/mac",
    },
  },
  {
    productType: "WATCH",
    pathLink: {
      title: "Watch",
      goTo: "/apple-watch",
    },
  },
  {
    productType: "SOUND",
    pathLink: {
      title: "Âm thanh",
      goTo: "/sound",
    },
  },
  {
    productType: "ACCESSORY",
    pathLink: {
      title: "Phụ kiện",
      goTo: "/accessory",
    },
  },
];

export const routes = [...ordinaryRoutes, ...specialRoutes];
