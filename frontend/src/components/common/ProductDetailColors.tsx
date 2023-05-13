import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { onChangeProductColor } from "../../redux/slices/productImagesSlice";
import { useGetProductImagesByIdQuery } from "../../redux/api/productsApi";

type ProductDetailColorsProps = {
  productId: string;
  mainShowcaseImage: string;
};

export default function ProductDetailColors({
  productId,
  mainShowcaseImage,
}: ProductDetailColorsProps) {
  const currentColor = useAppSelector((state) => state.productImages.color);
  const dispatch = useAppDispatch();
  const {
    data: productImagesData,
    error: productImagesError,
    isLoading: productImagesIsLoading,
  } = useGetProductImagesByIdQuery({
    product_id: productId,
    main_showcase_image: mainShowcaseImage,
  });

  const DefaultElement = () => (
    <div className="w-full my-6">
      <p className="mb-2 text-sm">Màu sắc</p>
      <div className="w-full">
        <ul className="flex items-center space-x-[10px]">
          <li className="relative">
            <div className="p-[4px]">
              <div
                className={`w-7 h-7 rounded-full`}
                style={{ backgroundColor: currentColor }}
              />
            </div>
            <div
              className={`absolute w-full h-full top-0 left-0 rounded-full cursor-pointer border-[1px] border-blue-700`}
            />
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {productImagesError || productImagesIsLoading ? (
        <DefaultElement />
      ) : productImagesData ? (
        productImagesData.data.length > 0 ? (
          <div className="w-full my-6">
            <p className="mb-2 text-sm">Màu sắc</p>
            <div className="w-full">
              <ul className="flex items-center space-x-[10px]">
                {productImagesData.data.map((item, index) => (
                  <li key={index} className="relative">
                    <div className="p-[4px]">
                      <div
                        key={index}
                        className={`w-7 h-7 rounded-full`}
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          onChangeProductColor({
                            ...item,
                            showcase_image: item.list_images[0],
                          })
                        )
                      }
                      className={`absolute w-full h-full top-0 left-0 rounded-full cursor-pointer ${
                        currentColor === item.color
                          ? "border-[1px] border-blue-700"
                          : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <DefaultElement />
        )
      ) : (
        <DefaultElement />
      )}
    </>
  );
}
