import { useState } from "react";
import { MAX_NUM_STARS_RATING } from "../../constants/config";
import { useCreateProductRatingMutation } from "../../redux/api/productsApi";
import { ProductRatingsRequest } from "../../redux/types/types";
import { formatDate } from "../../utils/helper";
import { AiOutlineLoading } from "react-icons/ai";

type ProductDetailRatingActionProps = {
  product_id: string;
};

export default function ProductDetailRatingAction({
  product_id,
}: ProductDetailRatingActionProps) {
  const [numStars, setNumStars] = useState(5);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [createProductRating, { isLoading, isError, isSuccess, data }] =
    useCreateProductRatingMutation();

  return (
    <div className="pt-4">
      <p className="font-bold">Viết đánh giá của riêng bạn</p>
      <div className="flex items-center my-2 space-x-4">
        <p className="text-sm font-semibold">Chất lượng*:</p>
        <div className="flex items-center relative whitespace-nowrap">
          {Array.from(Array(MAX_NUM_STARS_RATING)).map((item, index) => (
            <svg
              fill={index + 1 <= numStars ? "#FBB701" : "#BDBDBD"}
              key={index}
              width="20"
              height="20"
              viewBox="0 0 940.688 940.688"
              className="mr-[1px] cursor-pointer"
              onClick={() => setNumStars(index + 1)}
            >
              <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
            </svg>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold mb-2 mt-4">Tên của bạn</p>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full p-3 text-base text-gray-900 border border-gray-300 rounded bg-white"
        />
      </div>
      <div>
        <p className="text-sm font-semibold mb-2 mt-4">
          Đánh giá của bạn về sản phẩm*
        </p>
        <textarea
          value={review}
          onChange={(event) => setReview(event.target.value)}
          className="w-full p-3 text-base text-gray-900 border border-gray-300 rounded bg-white"
        />
      </div>
      <button
        disabled={isLoading}
        onClick={async () => {
          if (name.length !== 0 && review.length !== 0) {
            const rating: ProductRatingsRequest = {
              person_name: name,
              review: review,
              num_stars: numStars,
              created: formatDate(new Date()),
              product_id: product_id,
            };
            const res = await createProductRating(rating).unwrap();
            setNumStars(5);
            setName("");
            setReview("");
          } else {
            alert(
              "Bạn cần thêm thông tin tên và nội dung đánh giá để có thể gửi đánh giá"
            );
          }
        }}
        className={`rounded-lg px-16 text-white my-4 h-10 ${
          isLoading ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-500"
        }`}
      >
        {isLoading ? (
          <AiOutlineLoading className="animate-spin" size={20} />
        ) : (
          <span>Gửi</span>
        )}
      </button>
      {isLoading ? null : isSuccess ? (
        <p className="text-xs text-[#28a745] font-semibold">
          Bạn đã gửi đánh giá thành công
        </p>
      ) : isError ? (
        <p className="text-xs text-[#dc3545] font-semibold">
          Đã có lỗi xảy ra, chưa gửi được đánh giá
        </p>
      ) : null}
    </div>
  );
}
