import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { SlideItem } from "./types";

type CarouselProps = {
  banners: SlideItem[];
  height: number;
};

export default function Carousel({ banners, height }: CarouselProps) {
  const [itemIndex, setItemIndex] = useState(0);

  function handleNextItem() {
    const nextItemIndex = itemIndex == banners.length - 1 ? 0 : itemIndex + 1;
    setItemIndex(nextItemIndex);
  }
  function handlePreviousItem() {
    const prevItemIndex = itemIndex == 0 ? banners.length - 1 : itemIndex - 1;
    setItemIndex(prevItemIndex);
  }
  useEffect(() => {
    const intervalId = setInterval(handleNextItem, 5000);
    return () => clearInterval(intervalId);
  }, [itemIndex]);

  return (
    <div className="relative w-full" style={{ height: `${height}vh` }}>
      <div className="overflow-hidden h-full w-full">
        <div
          className="h-full flex transition-transform duration-1000 ease-in-out"
          style={{
            width: `${100 * banners.length}%`,
            transform: `translateX(-${
              100 * (1 / banners.length) * itemIndex
            }%)`,
          }}
        >
          {banners.map((item, index) => (
            <Link to={item.to} className="h-full w-full" key={index}>
              <img
                src={item.url}
                alt={`Banner ${index}`}
                className="object-cover h-full w-full"
              />
            </Link>
          ))}
        </div>
      </div>
      <button
        onClick={handlePreviousItem}
        className="bg-gray-500 opacity-40 hover:opacity-80 absolute top-1/2 left-5 cursor-pointer -translate-y-7 h-14 w-14 rounded-full flex items-center justify-center"
      >
        <AiOutlineLeft size={25} color="white" />
      </button>
      <button
        onClick={handleNextItem}
        className="bg-gray-500 opacity-40 hover:opacity-80 absolute top-1/2 right-5 cursor-pointer -translate-y-7 h-14 w-14 rounded-full flex items-center justify-center"
      >
        <AiOutlineRight size={25} color="white" />
      </button>
      <div className="absolute bottom-2 flex items-center justify-center w-full">
        {banners.map((item, index) => {
          const className = `rounded-full w-2 h-2 ml-2 mr-2 cursor-pointer ${
            index == itemIndex ? "bg-gray-700" : "bg-gray-400 opacity-40"
          }`;
          return (
            <button
              key={index}
              onClick={() => setItemIndex(index)}
              className={className}
            />
          );
        })}
      </div>
    </div>
  );
}
