import { ProductCardInfo } from "../components/common/types";
import { SHOPDUNK_BACKEND_BASE_URL } from "../constants/config";
import { ProductsDto } from "../redux/types/types";
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
  return `${SHOPDUNK_BACKEND_BASE_URL}${imageUrl}`;
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
