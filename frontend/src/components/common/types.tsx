export type ProductCardInfo = {
  id: string;
  displayImage: string;
  name: string;
  actualPrice: number;
  oldPrice: number;
};

export type InformationCardInfo = {
  displayImage: string;
  title: string;
  date: string;
};

export type FooterNavigationItem = {
  name: string;
  to: string;
};

export type SlideItem = {
  url: string;
  to: string;
};

export type ChoiceItem = {
  name: string;
  productType: string;
  productSubType: string | null;
  actionValue: string;
};

export type DropDownChoiceItem = {
  name: string;
  actionValue: string;
};

export type ProductSupportItem = {
  displayImage: string;
  title: string;
  link: string;
};

export type ProductDescriptionItem = {
  title: string;
  desc: string[];
};
