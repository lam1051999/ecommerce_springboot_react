import { useState } from "react";
import { infoButtons } from "../../constants/productInfo";
import { ProductInfosEntity } from "../../redux/types/types";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useGetProductInfosByIdQuery } from "../../redux/api/productsApi";

type ProductDetailInfoProps = {
  productId: string;
};

export default function ProductDetailInfo({
  productId,
}: ProductDetailInfoProps) {
  const [isExpan, setIsExpan] = useState(false);
  const [infoButtonId, setInfoButtonId] = useState(infoButtons[0].button_id);
  const found = infoButtons.find((item) => item.button_id === infoButtonId);
  const buttonKey = found ? found.key : infoButtons[0].key;
  const { data, error, isLoading } = useGetProductInfosByIdQuery(productId);

  return (
    <div className="w-full mb-16">
      <div className="my-6 w-full flex items-center justify-center">
        <ul className="flex items-center justify-center space-x-5">
          {infoButtons.map((item) => (
            <li key={item.button_id}>
              <button
                className={`text-center py-2 border w-40 text-sm rounded-lg ${
                  infoButtonId === item.button_id
                    ? "text-blue-700 border-blue-700"
                    : "border-gray-300"
                }`}
                onClick={() => setInfoButtonId(item.button_id)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {isLoading || error
          ? null
          : data
          ? data.data[buttonKey as keyof ProductInfosEntity] && (
              <>
                <div
                  style={{ height: isExpan ? "100%" : "20vh" }}
                  className="overflow-hidden"
                >
                  <div
                    className="text-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: data.data[buttonKey as keyof ProductInfosEntity],
                    }}
                  />
                </div>
                <div className="flex items-center justify-center py-2">
                  <button
                    className="py-2 px-4 flex items-center justify-center text-blue-700"
                    onClick={() => setIsExpan((prevState) => !prevState)}
                  >
                    <span style={{ fontSize: "0.8rem" }}>
                      {isExpan ? "Thu gọn" : "Tìm hiểu thêm"}
                    </span>
                    {isExpan ? (
                      <AiOutlineUp size={15} className="ml-1" />
                    ) : (
                      <AiOutlineDown size={15} className="ml-1" />
                    )}
                  </button>
                </div>
              </>
            )
          : null}
      </div>
    </div>
  );
}
