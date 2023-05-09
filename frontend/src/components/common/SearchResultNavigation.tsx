import { useEffect, useState } from "react";
import { NUM_PRODUCTS_RESULT_PAGE_LIMIT } from "../../constants/config";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

type SearchResultNavigationProps = {
  numPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function SearchResultNavigation({
  numPage,
  page,
  setPage,
}: SearchResultNavigationProps) {
  const numPageLimit =
    numPage < NUM_PRODUCTS_RESULT_PAGE_LIMIT
      ? numPage
      : NUM_PRODUCTS_RESULT_PAGE_LIMIT;
  const buttonArr = Array.from(Array(numPage)).map((item, index) => index);
  const [currentButtonArr, setCurrentButtonArr] = useState([
    ...buttonArr.slice(0, numPageLimit),
  ]);

  function handlePrevPage() {
    const minCurrentButton = currentButtonArr.at(0);
    if (page === minCurrentButton) {
      setCurrentButtonArr(
        buttonArr.slice(
          minCurrentButton - 1,
          minCurrentButton - 1 + numPageLimit
        )
      );
    }
    setPage((prevState) => prevState - 1);
  }
  function handleNextPage() {
    const maxCurrentButton = currentButtonArr.at(-1);
    if (page === maxCurrentButton) {
      setCurrentButtonArr(
        buttonArr.slice(
          maxCurrentButton + 2 - numPageLimit,
          maxCurrentButton + 2
        )
      );
    }
    setPage((prevState) => prevState + 1);
  }
  useEffect(() => {
    setCurrentButtonArr([...buttonArr.slice(0, numPageLimit)]);
  }, [numPageLimit]);

  return (
    <div className="my-10 flex flex-wrap space-x-2 items-center justify-center">
      <button
        disabled={page === 0}
        onClick={handlePrevPage}
        className={`${
          page === 0
            ? "bg-gray-200 text-gray-400"
            : "hover:bg-gray-200 bg-white"
        } w-10 h-10 flex items-center justify-center p-3 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)]`}
      >
        <AiOutlineLeft size={15} />
      </button>
      {currentButtonArr.map((item) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={`${
            item === page
              ? "bg-blue-700 text-white"
              : "bg-white hover:bg-gray-200"
          } w-10 h-10 flex items-center justify-center p-3 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)]`}
        >
          {item}
        </button>
      ))}
      <button
        disabled={page === numPage - 1}
        onClick={handleNextPage}
        className={`${
          page === numPage - 1
            ? "bg-gray-200 text-gray-400"
            : "hover:bg-gray-200 bg-white"
        } w-10 h-10 flex items-center justify-center p-3 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)]`}
      >
        <AiOutlineRight size={15} />
      </button>
    </div>
  );
}
