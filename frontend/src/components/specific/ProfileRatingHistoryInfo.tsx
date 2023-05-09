import { Link } from "react-router-dom";
import { useGetProductRatingsByUserQuery } from "../../redux/api/userApi";
import RatingStarsDisplay from "../common/RatingStarsDisplay";
import CustomerInfosContainer from "./CustomerInfosContainer";

export default function ProfileRatingHistoryInfo() {
  const {
    data: productRatingsByUserData,
    error: productRatingsByUserError,
    isLoading: productRatingsByUserIsLoading,
  } = useGetProductRatingsByUserQuery();

  const Skeleton = () => (
    <div className="w-full animate-pulse">
      <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
      <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
    </div>
  );

  const mainContent = (
    <div className="w-full">
      {productRatingsByUserError || productRatingsByUserIsLoading ? (
        <Skeleton />
      ) : productRatingsByUserData ? (
        <div className="p-4 bg-white rounded-lg grid grid-cols-1 divide-y">
          {productRatingsByUserData.data.length === 0 ? (
            <p className="text-sm text-gray-500">
              Bạn chưa viết bất kỳ bài đánh giá nào
            </p>
          ) : (
            [...productRatingsByUserData.data]
              .sort((a, b) => {
                if (a.rating_detail.created > b.rating_detail.created) {
                  return -1;
                }
                if (a.rating_detail.created < b.rating_detail.created) {
                  return 1;
                }
                return 0;
              })
              .map((item) => (
                <div key={item.rating_detail.id} className="px-3 pt-3 pb-10">
                  <p>{item.rating_detail.review}</p>
                  <div className="flex items-center space-x-2 my-2">
                    <RatingStarsDisplay size={15} overlayWidth={0} />
                    <div className="w-1 h-1 rounded-full bg-gray-500" />
                    <p className="text-xs text-gray-500">
                      {item.rating_detail.created}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs text-gray-500">Đánh giá sản phẩm:</p>
                    <Link to={`/products/${item.product_detail.id}`}>
                      <p className="font-semibold hover:text-blue-700 inline text-sm">
                        {item.product_detail.name}
                      </p>
                    </Link>
                  </div>
                </div>
              ))
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
