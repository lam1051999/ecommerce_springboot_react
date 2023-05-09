import { useState } from "react";
import { MAX_NUM_STARS_RATING } from "../../constants/config";
import {
  CustomBaseQueryError,
  ProductRatingsRequest,
} from "../../redux/types/types";
import { formatDate } from "../../utils/helper";
import { useCreateProductRatingsMutation } from "../../redux/api/userApi";
import { Formik } from "formik";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { productsApi } from "../../redux/api/productsApi";
import SubmitButton from "./SubmitButton";

type ProductDetailRatingActionProps = {
  product_id: string;
};

type ProductRatingFormikError = {
  name?: string;
  review?: string;
};

export default function ProductDetailRatingAction({
  product_id,
}: ProductDetailRatingActionProps) {
  const [numStars, setNumStars] = useState(5);
  const dispatch = useAppDispatch();
  const [createProductRatings, { isLoading, isError, isSuccess, error }] =
    useCreateProductRatingsMutation();

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

      <Formik
        initialValues={{
          name: "",
          review: "",
        }}
        validate={(values) => {
          const errors: ProductRatingFormikError = {};
          if (!values.name) {
            errors.name = "Trường bắt buộc.";
          }
          if (!values.review) {
            errors.review = "Trường bắt buộc.";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const rating: ProductRatingsRequest = {
            person_name: values.name,
            review: values.review,
            num_stars: numStars,
            created: formatDate(new Date()),
            product_id: product_id,
          };
          await createProductRatings(rating)
            .unwrap()
            .then(() => {
              resetForm();
              dispatch(productsApi.util.invalidateTags(["ProductRatingsById"]));
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <div>
              <p className="text-sm font-semibold mb-2 mt-4">Tên của bạn</p>
              <input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-red-500">
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 mt-4">
                Đánh giá của bạn về sản phẩm*
              </p>
              <textarea
                value={values.review}
                onChange={handleChange}
                onBlur={handleBlur}
                name="review"
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-red-500">
                {errors.review && touched.review && errors.review}
              </p>
            </div>
            <SubmitButton
              isSubmitting={isSubmitting}
              text="Gửi"
              width="10rem"
              isCenter={false}
            />
            {isLoading ? null : isSuccess ? (
              <p className="text-xs text-[#28a745] font-semibold">
                Bạn đã gửi đánh giá thành công
              </p>
            ) : isError ? (
              (error as CustomBaseQueryError).status === 403 ? (
                <p className="text-xs text-[#dc3545] font-semibold">
                  Bạn chưa mua sản phẩm này, không thể gửi đánh giá
                </p>
              ) : (
                <p className="text-xs text-[#dc3545] font-semibold">
                  Đã có lỗi xảy ra, chưa gửi được đánh giá
                </p>
              )
            ) : null}
          </form>
        )}
      </Formik>
    </div>
  );
}
