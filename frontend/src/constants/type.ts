import React from "react";

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
  productType: string;
  pathLink: PathLink;
};

export type InfoButton = {
  title: string;
  key: string;
  button_id: number;
};
