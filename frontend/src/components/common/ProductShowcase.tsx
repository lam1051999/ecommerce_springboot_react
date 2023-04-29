import { useEffect } from "react";
import Carousel from "./Carousel";
import ChoiceBar from "./ChoiceBar";
import ProductSupport from "./ProductSupport";
import ProductDescription from "./ProductDescription";
import {
  ChoiceItem,
  ProductDescriptionItem,
  ProductSupportItem,
  SlideItem,
} from "./types";
import ProductPageNavigation from "./ProductPageNavigation";
import ProductGridWrapper from "./ProductGridWrapper";
import { useAppDispatch } from "../../redux/hooks/hooks";
import {
  onChangePage,
  onChangeProductSubType,
  onChangeProductType,
  onChangeSortType,
} from "../../redux/slices/choiceBarSlice";
import PageContainer from "./PageContainer";

type ProductShowcaseProps = {
  title: string;
  banners: SlideItem[];
  choices: ChoiceItem[];
  supportItems: ProductSupportItem[] | null;
  allDesc: ProductDescriptionItem[];
  productType: string;
};

export default function ProductShowcase({
  title,
  banners,
  choices,
  supportItems,
  allDesc,
  productType,
}: ProductShowcaseProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(onChangeProductType(productType));
    dispatch(onChangeProductSubType(null));
    dispatch(onChangeSortType("RANDOM"));
    dispatch(onChangePage(0));
  }, []);

  return (
    <PageContainer>
      <h1 className="text-4xl font-bold text-center leading-none my-5">
        {title}
      </h1>
      <Carousel banners={banners} height={50} />
      <ChoiceBar choices={choices} />
      <ProductGridWrapper />
      {supportItems && <ProductSupport supportItems={supportItems} />}
      <ProductDescription allDesc={allDesc} />
    </PageContainer>
  );
}
