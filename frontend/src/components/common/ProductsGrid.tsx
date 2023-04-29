import ProductCard from "./ProductCard";
import { ProductCardInfo } from "./types";

type ProductsGridProps = {
  productCardInfos: ProductCardInfo[];
};

export default function ProductsGrid({ productCardInfos }: ProductsGridProps) {
  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {productCardInfos.map((productCardInfo) => (
        <ProductCard
          productCardInfo={productCardInfo}
          key={productCardInfo.id}
        />
      ))}
    </div>
  );
}
