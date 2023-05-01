import ProductsGrid from "./ProductsGrid";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import {
  NUM_PRODUCTS_PREVIEW,
  NUM_PRODUCTS_SHOWCASE,
} from "../../constants/config";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { getProductCardInfosFromProductDto } from "../../utils/helper";
import ProductPageNavigation from "./ProductPageNavigation";

export default function ProductGridWrapper() {
  const productType = useAppSelector((state) => state.choiceBar.productType);
  const productSubType = useAppSelector(
    (state) => state.choiceBar.productSubType
  );
  const sortType = useAppSelector((state) => state.choiceBar.sortType);
  const page = useAppSelector((state) => state.choiceBar.page);
  const { data, error, isLoading } = useGetProductsQuery({
    sort_type: sortType,
    product_type: productType,
    product_sub_type: productSubType,
    page: page,
    size: NUM_PRODUCTS_SHOWCASE,
  });

  return (
    <div className="w-full h-full">
      {error || isLoading ? (
        <div className={`w-full grid grid-cols-${NUM_PRODUCTS_PREVIEW} gap-6`}>
          {Array.from(Array(NUM_PRODUCTS_SHOWCASE)).map((item, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : data ? (
        <>
          <ProductsGrid
            productCardInfos={getProductCardInfosFromProductDto(data.data)}
          />
          <ProductPageNavigation numPage={data.data.total_pages} />
        </>
      ) : (
        <ProductCardSkeleton />
      )}
    </div>
  );
}
