import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getFullPathImage } from "../../utils/helper";
import { onChangeShowcaseImage } from "../../redux/slices/productImagesSlice";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useState } from "react";

export default function ProductDetailShowcaseImage() {
  const showcaseImage = useAppSelector(
    (state) => state.productImages.showcase_image
  );
  const listImages = useAppSelector((state) => state.productImages.list_images);
  const dispatch = useAppDispatch();
  const [isTranslateX, setIsTranslateX] = useState(false);
  const SLIDE_IMAGE_LENGTH_REM = 6.5;

  return (
    <>
      <div className="bg-gray-100 grow rounded-md w-full cursor-pointer">
        <img
          src={getFullPathImage(showcaseImage)}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-24 w-full my-3 relative">
        <div className="overflow-hidden w-full">
          <div
            className="flex items-center justify-between transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${isTranslateX ? 50 : 0}%)`,
              width: `${SLIDE_IMAGE_LENGTH_REM * listImages.length}rem`,
            }}
          >
            {listImages.map((item, index) => (
              <div
                key={index}
                className={`bg-white h-full rounded-md flex-[0_0_${SLIDE_IMAGE_LENGTH_REM}rem] mr-1 border border-2 cursor-pointer overflow-hidden ${
                  showcaseImage === item ? "border-blue-700" : ""
                }`}
                onClick={() => dispatch(onChangeShowcaseImage(item))}
              >
                <img
                  src={getFullPathImage(item)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            if (isTranslateX) setIsTranslateX((prevState) => !prevState);
          }}
          className="bg-gray-500 opacity-40 hover:opacity-80 absolute top-1/2 -left-5 cursor-pointer -translate-y-5 h-10 w-10 rounded-full flex items-center justify-center"
        >
          <AiOutlineLeft size={20} color="white" />
        </button>
        <button
          onClick={() => {
            if (!isTranslateX) setIsTranslateX((prevState) => !prevState);
          }}
          className="bg-gray-500 opacity-40 hover:opacity-80 absolute top-1/2 -right-5 cursor-pointer -translate-y-5 h-10 w-10 rounded-full flex items-center justify-center"
        >
          <AiOutlineRight size={20} color="white" />
        </button>
      </div>
    </>
  );
}
