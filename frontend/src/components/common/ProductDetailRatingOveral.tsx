import { useGetProductRatingsByIdQuery } from "../../redux/api/productsApi";
import RatingStarsDisplay from "./RatingStarsDisplay";

type ProductDetailRatingOveralProps = {
  product_id: string;
};

export default function ProductDetailRatingOveral({
  product_id,
}: ProductDetailRatingOveralProps) {
  const { data, error, isLoading } = useGetProductRatingsByIdQuery(product_id);
  const LoadingElement = () => (
    <div className="animate-pulse w-full">
      <div className="bg-gray-300 mb-2 grow rounded-md h-[25px] w-[40%]" />
    </div>
  );

  if (isLoading || error) {
    return <LoadingElement />;
  } else {
    if (data) {
      return (
        <div className="flex items-center">
          <RatingStarsDisplay
            size={15}
            overlayWidth={100 - (100 * data.data.average_num_stars) / 5}
          />
          <button className="ml-4 text-sm text-blue-700">
            {data.data.list_reviews.length} đánh giá
          </button>
        </div>
      );
    } else {
      return <LoadingElement />;
    }
  }
}
