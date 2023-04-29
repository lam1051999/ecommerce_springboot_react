import { AiOutlineRight } from "react-icons/ai";
import { ProductSupportItem } from "./types";

type ProductSupportProps = {
  supportItems: ProductSupportItem[];
};

export default function ProductSupport({ supportItems }: ProductSupportProps) {
  return (
    <div
      className="flex items-center justify-between w-full"
      style={{ height: "25vh" }}
    >
      {supportItems.map((item, index) => (
        <div
          key={index}
          className="h-full flex items-center bg-white p-6 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[2px_2px_20px_rgba(0,0,0,0.3)]"
          style={{ width: `${100 / supportItems.length - 1}%` }}
        >
          <div className="w-1/4 mx-8 h-full">
            <img
              src={item.displayImage}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full flex flex-col justify-center">
            <h1 className="mb-4 text-2xl font-semibold leading-none w-full">
              {item.title}
            </h1>
            <div className="w-full">
              <button className="flex items-center justify-center text-blue-700 py-2 text-sm">
                <span>{item.link}</span>
                <AiOutlineRight />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
