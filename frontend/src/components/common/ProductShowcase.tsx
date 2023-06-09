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
import ProductGridWrapper from "./ProductGridWrapper";
import { useAppDispatch } from "../../redux/hooks/hooks";
import {
  onChangePage,
  onChangeProductSubType,
  onChangeProductType,
  onChangeSortType,
} from "../../redux/slices/choiceBarSlice";
import PageContainer from "./PageContainer";
import { ProductType, SortType } from "../../redux/types/types";

type ProductShowcaseProps = {
  title: string;
  banners: SlideItem[];
  choices: ChoiceItem[];
  supportItems: ProductSupportItem[] | null;
  allDesc: ProductDescriptionItem[];
  productType: ProductType;
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
    dispatch(onChangeSortType(SortType.RANDOM));
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
