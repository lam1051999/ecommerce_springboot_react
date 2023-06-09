import { ProductCardInfo } from "../components/common/types";
import { SHOPDUNK_IMAGES_BASE_URL } from "../constants/config";
import { PageRoute } from "../constants/type";
import {
  OrdersStatus,
  Payment,
  PaymentStatus,
  ProductsDto,
} from "../redux/types/types";
import { MapTitleChoices, MapTitlePreviewChoice } from "./types";

const CURRENCY_FORMATTER = new Intl.NumberFormat("de-DE", {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}

export function getPreviewChoices(
  mapTitleChoices: MapTitleChoices[]
): MapTitlePreviewChoice[] {
  return mapTitleChoices.map((item) => ({
    title: item.title,
    choice: item.choices[0],
    goTo: item.goTo,
  }));
}

export function getFullPathImage(imageUrl: string): string {
  return `${SHOPDUNK_IMAGES_BASE_URL}/static_files${imageUrl}`;
}

export function getProductCardInfosFromProductDto(
  productsDtoData: ProductsDto
): ProductCardInfo[] {
  const listProducts = productsDtoData.list_products;
  return listProducts.map((item) => ({
    id: item.id,
    displayImage: getFullPathImage(item.showcase_image),
    name: item.name,
    actualPrice: item.actual_price,
    oldPrice: item.old_price,
  }));
}

export function changeFormatData(date: string): string {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
}

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// https://stackoverflow.com/questions/67407289/check-if-path-matches-dynamic-route-string
export function getMatchedRoute(routes: PageRoute[], pathname: string) {
  // escapeDots: abc.com -> abc\\.com
  const escapeDots = (s: string) =>
    Array.from(s, (c) => (c === "." ? "\\." : c)).join("");
  return routes.find((o) =>
    new RegExp(
      `^${o.path
        .split("/")
        .map((s) => (s.startsWith(":") ? "[^/]+" : escapeDots(s)))
        .join("/")}$`
    ).test(pathname)
  );
}

export function getOrderStatusColor(status: string) {
  switch (status) {
    case OrdersStatus.PROCESSING:
      return "#FDB700";
    case OrdersStatus.APPROVED:
      return "#28A745";
    case OrdersStatus.REJECTED:
      return "#FF4127";
    default:
      return "#FDB700";
  }
}
export function getOrderStatusText(status: string) {
  switch (status) {
    case OrdersStatus.PROCESSING:
      return "Đang xử lý";
    case OrdersStatus.APPROVED:
      return "Thành công";
    case OrdersStatus.REJECTED:
      return "Đã huỷ";
    default:
      return "Đang xử lý";
  }
}
export function getPaymentText(payment: string) {
  switch (payment) {
    case Payment.BANK:
      return "Chuyển khoản ngân hàng";
    case Payment.ONEPAY:
      return "Thanh toán OnePay";
    case Payment.PAYOO:
      return "Thanh toán Payoo";
    case Payment.KREDIVO:
      return "Thanh toán Kredivo";
    default:
      return "Chuyển khoản ngân hàng";
  }
}
export function getPaymentStatusColor(status: string) {
  switch (status) {
    case PaymentStatus.PROCESSING:
      return "#FDB700";
    case PaymentStatus.PAID:
      return "#28A745";
    case PaymentStatus.CANCELED:
      return "#FF4127";
    default:
      return "#FDB700";
  }
}
export function getPaymentStatusText(status: string) {
  switch (status) {
    case PaymentStatus.PROCESSING:
      return "Đang chờ xử lý";
    case PaymentStatus.PAID:
      return "Đã thanh toán";
    case PaymentStatus.CANCELED:
      return "Đã huỷ";
    default:
      return "Đang chờ xử lý";
  }
}
export function getChosenOptionId<T>(
  event: React.ChangeEvent<HTMLSelectElement>,
  defaultValue: T
): T {
  const index = event.target.selectedIndex;
  const el = event.target.children[index];
  const id = el.getAttribute("id");
  return id ? (id as T) : defaultValue;
}
