import { useEffect, useState } from "react";
import { useLazyGetProductSearchQuery } from "../../redux/api/productsApi";
import { AiOutlineLoading } from "react-icons/ai";
import { getFullPathImage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

type SearchContainerProps = {
  setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchContainer({
  setIsOpenSearch,
}: SearchContainerProps) {
  const navigate = useNavigate();
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [
    triggerSearch,
    { error: triggerSearchError, data: triggerSearchData },
  ] = useLazyGetProductSearchQuery();
  useEffect(() => {
    let timeoutId: number;
    if (searchText) {
      setSearchIsLoading(true);
      timeoutId = setTimeout(() => {
        triggerSearch({
          page: 0,
          size: 10,
          search_text: searchText,
          sort_type: "RANDOM",
        })
          .unwrap()
          .then(() => {
            setSearchIsLoading(false);
          });
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchText]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)] flex flex-col">
      <div className="w-full relative">
        <div className="h-16 flex items-center justify-center">
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            name="searchText"
            className="w-[50%] px-4 h-10 border border-gray-300 rounded-sm text-sm"
            placeholder="Tìm kiếm"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setIsOpenSearch(false);
                navigate(`/search?q=${searchText}`);
                setSearchText("");
              }
            }}
          />
        </div>
        {searchText && (
          <div className="w-[50%] top-[52px] absolute bg-white translate-x-1/2 rounded-b-lg grid grid-cols-1 divide-y overflow-hidden">
            {searchIsLoading || triggerSearchError ? (
              <div className="flex items-center justify-center h-32 text-blue-700">
                <AiOutlineLoading className="animate-spin" size={25} />
              </div>
            ) : triggerSearchData ? (
              triggerSearchData.data.list_products.length === 0 ? (
                <div className="p-3">
                  <span className="text-sm text-gray-500">
                    Không có sản phẩm nào khớp chuỗi tìm kiếm, hãy thử chuỗi
                    khác
                  </span>
                </div>
              ) : (
                <>
                  {triggerSearchData.data.list_products.map((item) => (
                    <button
                      onClick={() => {
                        setIsOpenSearch(false);
                        navigate(`/products/${item.id}`);
                        setSearchText("");
                      }}
                      className="flex items-center space-x-2 p-3 hover:bg-gray-100"
                      key={item.id}
                    >
                      <div className="w-6 h-6">
                        <img
                          src={getFullPathImage(item.showcase_image)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-gray-500">{item.name}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpenSearch(false);
                      navigate(`/search?q=${searchText}`);
                      setSearchText("");
                    }}
                    className="p-3 text-left hover:bg-gray-100"
                  >
                    <span className="text-sm text-gray-500">
                      Xem tất cả kết quả ...
                    </span>
                  </button>
                </>
              )
            ) : (
              <div className="flex items-center justify-center h-32 text-blue-700">
                <AiOutlineLoading className="animate-spin" size={25} />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="w-full grow" onClick={() => setIsOpenSearch(false)} />
    </div>
  );
}
