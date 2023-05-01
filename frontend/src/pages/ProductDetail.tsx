import { useGetProductsByIdQuery } from "../redux/api/productsApi";
import { useParams } from "react-router-dom";
import ProductDetailSkeletion from "../components/common/ProductDetailSkeletion";
import { formatCurrency } from "../utils/helper";
import ProductDetailColors from "../components/common/ProductDetailColors";
import ProductExtraTypeInfo from "../components/common/ProductExtraTypeInfo";
import ProductDetailShowcaseImage from "../components/common/ProductDetailShowcaseImage";
import ProductDetailInfo from "../components/common/ProductDetailInfo";
import ProductDetailRating from "../components/common/ProductDetailRating";
import ProductDetailRatingOveral from "../components/common/ProductDetailRatingOveral";
import { useAppDispatch } from "../redux/hooks/hooks";
import { DetailProductsById, ProductsEntity } from "../redux/types/types";
import { addCartProduct } from "../redux/slices/shoppingCartSlice";
import PageContainer from "../components/common/PageContainer";

export default function ProductDetail() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { productId } = params;
  if (!productId) return null;
  const { data, error, isLoading } = useGetProductsByIdQuery(productId, {
    refetchOnMountOrArgChange: true,
  });
  function handleAddToCart(detail: DetailProductsById) {
    const productsEntity: ProductsEntity = {
      id: detail.id,
      name: detail.name,
      extra_product_type: detail.extra_product_type,
      extra_strap_type: detail.extra_strap_type,
      extra_gpu_type: detail.extra_gpu_type,
      extra_storage_type: detail.extra_storage_type,
      extra_color_type: detail.extra_color_type,
      extra_ram_type: detail.extra_ram_type,
      extra_model_type: detail.extra_model_type,
      extra_screen_size: detail.extra_screen_size,
      actual_price: detail.actual_price,
      old_price: detail.old_price,
      showcase_image: detail.showcase_image,
      product_type: detail.product_type,
      product_sub_type: detail.product_sub_type,
      created: detail.created,
      modified: detail.modified,
    };
    dispatch(addCartProduct(productsEntity));
  }

  return (
    <PageContainer>
      {error || isLoading ? (
        <ProductDetailSkeletion />
      ) : data ? (
        <div className="w-full">
          <div className="flex justify-between w-full">
            <div className="h-full flex flex-col" style={{ width: "48.5%" }}>
              <ProductDetailShowcaseImage />
            </div>
            <div style={{ width: "48.5%" }}>
              <h1 className="mb-6 text-2xl font-bold leading-none">
                {data.name}
              </h1>
              <ProductDetailRatingOveral product_id={data.id} />
              <div className="w-full h-[0.3px] bg-gray-300 my-4" />
              <div className="w-full">
                <div className="flex items-center">
                  <p className="tracking-tight mr-4 font-bold text-xl text-blue-700">
                    {formatCurrency(data.actual_price)}
                  </p>
                  <p className="tracking-tight text-lg text-gray-500 line-through">
                    {formatCurrency(data.old_price)}
                  </p>
                </div>
              </div>
              {data.extra_product_type && (
                <ProductExtraTypeInfo
                  title="Loại Sản Phẩm"
                  value={data.extra_product_type}
                />
              )}
              {data.extra_strap_type && (
                <ProductExtraTypeInfo
                  title="Loại Dây"
                  value={data.extra_strap_type}
                />
              )}
              {data.extra_gpu_type && (
                <ProductExtraTypeInfo title="GPU" value={data.extra_gpu_type} />
              )}
              {data.extra_storage_type && (
                <ProductExtraTypeInfo
                  title="Dung Lượng"
                  value={data.extra_storage_type}
                />
              )}
              {data.extra_ram_type && (
                <ProductExtraTypeInfo title="RAM" value={data.extra_ram_type} />
              )}
              {data.extra_model_type && (
                <ProductExtraTypeInfo
                  title="Model"
                  value={data.extra_model_type}
                />
              )}
              {data.extra_screen_size && (
                <ProductExtraTypeInfo
                  title="Màn hình"
                  value={data.extra_screen_size}
                />
              )}
              {data.list_colors.length > 0 && (
                <ProductDetailColors listColors={data.list_colors} />
              )}
              <button
                onClick={() => handleAddToCart(data)}
                className="rounded-lg w-full text-center py-3 text-white font-semibold bg-blue-700 hover:bg-blue-500"
              >
                Mua ngay
              </button>
            </div>
          </div>
          <ProductDetailInfo detailInfo={data.specifications} />
          <ProductDetailRating product_id={data.id} />
        </div>
      ) : (
        <ProductDetailSkeletion />
      )}
    </PageContainer>
  );
}
