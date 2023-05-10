import { useGetProductsByIdQuery } from "../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailSkeletion from "../components/common/ProductDetailSkeletion";
import { formatCurrency } from "../utils/helper";
import ProductDetailColors from "../components/common/ProductDetailColors";
import ProductExtraTypeInfo from "../components/common/ProductExtraTypeInfo";
import ProductDetailShowcaseImage from "../components/common/ProductDetailShowcaseImage";
import ProductDetailInfo from "../components/common/ProductDetailInfo";
import ProductDetailRating from "../components/common/ProductDetailRating";
import ProductDetailRatingOveral from "../components/common/ProductDetailRatingOveral";
import { ShoppingCartChangeType } from "../redux/types/types";
import PageContainer from "../components/common/PageContainer";
import { useChangeShoppingCartQuantityMutation } from "../redux/api/userApi";

export default function ProductDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const { productId } = params;
  if (!productId) return null;
  const { data, error, isLoading } = useGetProductsByIdQuery(productId);
  const [
    changeShoppingCart,
    {
      isError: changeShoppingCartIsError,
      isSuccess: changeShoppingCartIsSuccess,
      error: changeShoppingCartError,
      data: changeShoppingCartData,
    },
  ] = useChangeShoppingCartQuantityMutation();

  async function handleAddToCart(productId: string) {
    await changeShoppingCart({
      amount: 1,
      product_id: productId,
      type: ShoppingCartChangeType.MODIFY,
    })
      .unwrap()
      .then(() => navigate("/shopping-cart"));
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
                onClick={() => handleAddToCart(data.id)}
                className="rounded-lg w-full text-center py-3 text-white font-semibold bg-blue-700 hover:bg-blue-500"
              >
                Mua ngay
              </button>
              {changeShoppingCartIsError ? (
                <p className="text-xs text-red-500">
                  Đã có lỗi xảy ra, chưa thể thêm sản phẩm vào giỏ hàng
                </p>
              ) : null}
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
