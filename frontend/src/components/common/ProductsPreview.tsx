import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import OutlineBlueButton from "./OutlineBlueButton";
import ProductsGrid from "./ProductsGrid";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import { NUM_PRODUCTS_PREVIEW } from "../../constants/config";
import { getProductCardInfosFromProductDto } from "../../utils/helper";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { MapTitlePreviewChoice } from "../../utils/types";

type ProductsPreviewProps = {
  mapTitlePreviewChoice: MapTitlePreviewChoice;
};

export default function ProductsPreview({
  mapTitlePreviewChoice,
}: ProductsPreviewProps) {
  const { title, choice, goTo } = mapTitlePreviewChoice;
  const { productType, productSubType } = choice;
  const { data, error, isLoading } = useGetProductsQuery({
    sort_type: "RANDOM",
    product_type: productType,
    product_sub_type: productSubType,
    page: 0,
    size: NUM_PRODUCTS_PREVIEW,
  });

  return (
    <div className="w-full my-12">
      <h1 className="mb-10 text-3xl font-bold leading-none text-center">
        {title}
      </h1>
      <div className="mb-6 w-full">
        {error || isLoading ? (
          <div
            className={`w-full grid grid-cols-${NUM_PRODUCTS_PREVIEW} gap-6`}
          >
            {Array.from(Array(NUM_PRODUCTS_PREVIEW)).map((item, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : data ? (
          <ProductsGrid
            productCardInfos={getProductCardInfosFromProductDto(data.data)}
          />
        ) : (
          <ProductCardSkeleton />
        )}
      </div>
      <div className="flex items-center justify-center w-full">
        <Link to={goTo}>
          <OutlineBlueButton>
            <span>Xem tất cả {title} </span>
            <AiOutlineRight size={20} />
          </OutlineBlueButton>
        </Link>
      </div>
    </div>
  );
}
