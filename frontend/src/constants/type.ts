import React from "react";
import { ProductType } from "../redux/types/types";

export type PathLink = {
  title: string;
  goTo: string | null;
};

export type PageRoute = {
  path: string;
  element: React.ReactNode;
  listPath: PathLink[];
};

export type ProductTypePathLink = {
  productType: ProductType;
  pathLink: PathLink;
};

export type InfoButton = {
  title: string;
  key: string;
  button_id: number;
};

export type ProfileTabsItem = {
  to: string;
  title: string;
  icon: React.ReactNode;
};
