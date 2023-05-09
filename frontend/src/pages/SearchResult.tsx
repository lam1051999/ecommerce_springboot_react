import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import { useEffect, useState } from "react";
import { useGetProductSearchQuery } from "../redux/api/productsApi";
import { NUM_PRODUCTS_PREVIEW } from "../constants/config";
import ProductCardSkeleton from "../components/common/ProductCardSkeleton";
import ProductsGrid from "../components/common/ProductsGrid";
import { getProductCardInfosFromProductDto } from "../utils/helper";
import SearchResultNavigation from "../components/common/SearchResultNavigation";
import { Formik } from "formik";
import SubmitButton from "../components/common/SubmitButton";
import { dropdownChoices } from "../constants/choices";
import { AiOutlineDown } from "react-icons/ai";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = "8";

export default function SearchResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");
  const [sortType, setSortType] = useState(dropdownChoices[0].name);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const {
    data: productSearchData,
    error: productSearchError,
    isLoading: productSearchIsLoading,
  } = useGetProductSearchQuery({
    sort_type: getSortTypeCode(sortType),
    page: page,
    size: parseInt(size),
    search_text: searchText as string,
  });

  function getSortTypeCode(name: string) {
    const found = dropdownChoices.find((item) => item.name === name);
    return found ? found.actionValue : "RANDOM";
  }

  useEffect(() => {
    if (searchText === null) navigate("/");
    else {
      setSortType(dropdownChoices[0].name);
      setPage(DEFAULT_PAGE);
      setSize(DEFAULT_SIZE);
    }
  }, [location]);

  useEffect(() => {
    setPage(DEFAULT_PAGE);
  }, [sortType, size]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold text-center leading-none my-5">
        Tìm kiếm
      </h1>
      <div className="w-full h-full p-6 bg-white rounded-lg">
        <Formik
          initialValues={{
            searchTextForm: searchText as string,
          }}
          validate={(values) => {
            const errors: { searchTextForm?: string } = {};
            if (!values.searchTextForm) {
              errors.searchTextForm = "Trường bắt buộc.";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            navigate(`/search?q=${values.searchTextForm}`);
            setSubmitting(false);
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
              <p className="text-sm my-2">Tìm từ khóa:</p>
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="searchTextForm"
                value={values.searchTextForm}
                className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg text-sm"
              />
              <p className="text-xs text-red-500">
                {errors.searchTextForm &&
                  touched.searchTextForm &&
                  errors.searchTextForm}
              </p>
              <SubmitButton
                isSubmitting={isSubmitting}
                text="Tìm kiếm"
                width="10rem"
              />
            </form>
          )}
        </Formik>
      </div>
      <div className="flex items-center space-x-4 my-8">
        <span className="text-sm">Sắp xếp theo</span>
        <div className="relative">
          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
            className="appearance-none pl-2 pr-8 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            {dropdownChoices.map((item) => (
              <option key={item.actionValue}>{item.name}</option>
            ))}
          </select>
          <AiOutlineDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-2"
          />
        </div>
        <span className="text-sm">Hiển thị</span>
        <div className="relative">
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="appearance-none pl-2 pr-8 py-1 border border-gray-300 rounded bg-white text-sm"
          >
            <option>8</option>
            <option>12</option>
            <option>16</option>
            <option>24</option>
          </select>
          <AiOutlineDown
            size={15}
            className="absolute right-3 top-1/2 -translate-y-2"
          />
        </div>
        <span className="text-sm">trên một trang</span>
      </div>
      <div className="w-full h-full">
        {productSearchError || productSearchIsLoading ? (
          <div
            className={`w-full grid grid-cols-${NUM_PRODUCTS_PREVIEW} gap-6`}
          >
            {Array.from(Array(size)).map((item, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : productSearchData ? (
          <>
            <ProductsGrid
              productCardInfos={getProductCardInfosFromProductDto(
                productSearchData.data
              )}
            />
            <SearchResultNavigation
              numPage={productSearchData.data.total_pages}
              page={page}
              setPage={setPage}
            />
          </>
        ) : (
          <ProductCardSkeleton />
        )}
      </div>
    </PageContainer>
  );
}
