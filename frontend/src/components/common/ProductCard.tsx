import { ProductCardInfo } from "./types";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helper";

type ProductCardProps = {
  productCardInfo: ProductCardInfo;
};

export default function ProductCard({ productCardInfo }: ProductCardProps) {
  return (
    <Link to={`/products/${productCardInfo.id}`}>
      <div className="flex flex-col h-full w-full bg-white p-6 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[2px_2px_20px_rgba(0,0,0,0.3)]">
        <div className="w-full mb-6">
          <img
            src={productCardInfo.displayImage}
            className="object-cover h-full w-full"
          />
        </div>
        <h3 className="mb-5 text-xl font-semibold leading-none">
          {productCardInfo.name}
        </h3>
        <div className="flex items-center">
          <p className="tracking-tight mr-4 font-semibold text-lg text-blue-700">
            {formatCurrency(productCardInfo.actualPrice)}
          </p>
          {productCardInfo.oldPrice && (
            <p className="tracking-tight text-sm text-gray-500 line-through">
              {formatCurrency(productCardInfo.oldPrice)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
