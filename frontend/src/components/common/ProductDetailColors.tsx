import { ProductImagesDto } from "../../redux/types/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { onChangeProductColor } from "../../redux/slices/productImagesSlice";

type ProductDetailColorsProps = {
  listColors: ProductImagesDto[];
};

export default function ProductDetailColors({
  listColors,
}: ProductDetailColorsProps) {
  const currentColor = useAppSelector((state) => state.productImages.color);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full my-6">
      <p className="mb-2 text-sm">Màu sắc</p>
      <div className="w-full">
        <ul className="flex items-center space-x-[10px]">
          {listColors.map((item, index) => (
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
  );
}
