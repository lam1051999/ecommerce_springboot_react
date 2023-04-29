import { useState } from "react";
import IphoneDescriptionItem from "./ProductDescriptionItem";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ProductDescriptionItem } from "./types";

type ProductDescriptionProps = {
  allDesc: ProductDescriptionItem[];
};

export default function ProductDescription({
  allDesc,
}: ProductDescriptionProps) {
  const [isExpan, setIsExpan] = useState(false);

  return (
    <div className="w-full bg-white px-10 pt-10 my-10 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-1 gap-6">
        <div
          style={{ height: isExpan ? "100%" : "40vh" }}
          className="overflow-hidden"
        >
          {allDesc.map((item, index) => (
            <IphoneDescriptionItem
              key={index}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
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
  );
}
