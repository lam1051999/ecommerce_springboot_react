import { FaUserCircle } from "react-icons/fa";
import { MAX_NUM_STARS_RATING } from "../../constants/config";
import ProductDetailRatingAction from "./ProductDetailRatingAction";
import RatingStarsDisplay from "./RatingStarsDisplay";
import { changeFormatData } from "../../utils/helper";
import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useGetProductRatingsByIdQuery } from "../../redux/api/productsApi";

export type ProductDetailRatingProps = {
  product_id: string;
};

export default function ProductDetailRating({
  product_id,
}: ProductDetailRatingProps) {
  const { data, error, isLoading } = useGetProductRatingsByIdQuery(product_id);
  const [isExpan, setIsExpan] = useState(false);
  const LoadingElement = () => (
    <div className="mb-16">
      <h1 className="text-3xl font-bold leading-none mb-2">
        Đánh giá sản phẩm
      </h1>
      <div className="animate-pulse w-full flex items-center h-[55vh] space-x-4">
        <div className="bg-gray-300 mb-2 rounded-md h-full w-[35%]" />
        <div className="bg-gray-300 mb-2 grow rounded-md h-full grow" />
      </div>
    </div>
  );

  if (isLoading || error) {
    return <LoadingElement />;
  } else {
    if (data) {
      const {
        num_5_stars,
        num_4_stars,
        num_3_stars,
        num_2_stars,
        num_1_stars,
      } = data.data;
      const starsList = [
        num_5_stars,
        num_4_stars,
        num_3_stars,
        num_2_stars,
        num_1_stars,
      ];
      const totalReviews = data.data.list_reviews.length;

      return (
        <div className="mb-16 w-full">
          <h1 className="text-3xl font-bold leading-none mb-2">
            Đánh giá sản phẩm
          </h1>
          <div className="flex w-full">
            <div
              className="pt-4 pr-4 w-[30%]"
              style={{
                borderTop: "1px solid #d1d5db",
                borderRight: "1px solid #d1d5db",
              }}
            >
              <div
                className="flex items-center pb-4"
                style={{ borderBottom: "1px solid #d1d5db" }}
              >
                <div className="w-[30%]">
                  <h2 className="text-center font-bold text-[3.5rem] leading-none">
                    {data.data.average_num_stars.toFixed(1)}
                  </h2>
                  <p className="text-center text-[0.6rem]">
                    {totalReviews} đánh giá
                  </p>
                </div>
                <div className="grow flex flex-col space-y-2">
                  {Array.from(Array(MAX_NUM_STARS_RATING)).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 w-full"
                      >
                        <span className="text-gray-500 w-3">
                          {MAX_NUM_STARS_RATING - index}
                        </span>
                        <svg
                          fill="#FBB701"
                          key={index}
                          width="15"
                          height="15"
                          viewBox="0 0 940.688 940.688"
                        >
                          <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
                        </svg>
                        <div className="grow relative h-[12px] rounded bg-gray-200">
                          <div
                            className="bg-yellow-500 h-full rounded absolute top-0 left-0"
                            style={{
                              width: `${
                                (starsList[index] / totalReviews) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <ProductDetailRatingAction product_id={product_id} />
            </div>
            <div
              className="w-[70%] pl-4"
              style={{ borderTop: "1px solid #d1d5db" }}
            >
              <div
                className="overflow-hidden"
                style={{ height: isExpan ? "100%" : "55vh" }}
              >
                {data.data.list_reviews.map((item, index) => (
                  <div
                    className="pb-8 mt-4"
                    key={item.id}
                    style={{
                      borderBottom:
                        index === totalReviews - 1 ? "" : "1px solid #d1d5db",
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <FaUserCircle color="#DDDDDD" size={30} />
                      <span className="font-semibold leading-none">
                        {item.person_name}
                      </span>
                      <p className="text-xs text-gray-500 leading-none">
                        - {changeFormatData(item.created)}
                      </p>
                    </div>
                    <div className="my-3 inline-block">
                      <RatingStarsDisplay
                        size={15}
                        overlayWidth={((5 - item.num_stars) / 5) * 100}
                      />
                    </div>
                    <p className="text-sm">{item.review}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center py-2">
                <button
                  className="py-2 px-4 flex items-center justify-center text-blue-700"
                  onClick={() => setIsExpan((prevState) => !prevState)}
                >
                  <span style={{ fontSize: "0.8rem" }}>
                    {isExpan ? "Thu gọn" : "Xem thêm"}
                  </span>
                  {isExpan ? (
                    <AiOutlineUp size={15} className="ml-1" />
                  ) : (
                    <AiOutlineDown size={15} className="ml-1" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <LoadingElement />;
    }
  }
}
