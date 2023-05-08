import { BiArrowBack } from "react-icons/bi";
import CustomerInfosContainer from "./CustomerInfosContainer";
import { Link, useParams } from "react-router-dom";
import { useGetOrdersByIdQuery } from "../../redux/api/userApi";
import {
  changeFormatData,
  formatCurrency,
  getFullPathImage,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentStatusColor,
  getPaymentStatusText,
  getPaymentText,
} from "../../utils/helper";
import { useGetProvincesAndShopsQuery } from "../../redux/api/addressApi";
import ProductsExtraCartProperty from "../common/ProductsExtraCartProperty";

export default function ProfileOrdersDetail() {
  const params = useParams();
  const { orderId } = params;
  if (!orderId) return <CustomerInfosContainer mainContent={null} />;
  const {
    data: ordersByIdData,
    error: ordersByIdError,
    isLoading: ordersByIdIsLoading,
  } = useGetOrdersByIdQuery(orderId);
  const {
    data: provincesAndShopsData,
    error: provincesAndShopsError,
    isLoading: provincesAndShopsIsLoading,
  } = useGetProvincesAndShopsQuery();
  const Skeleton = () => (
    <div className="w-full animate-pulse">
      <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
      <div className="w-full bg-gray-300 mb-2 h-[50vh]" />
    </div>
  );
  function getProvincesAndShopById(provinceId: string) {
    const defaultValue = {
      province: "",
      district: "",
    };
    if (provincesAndShopsData) {
      const found = provincesAndShopsData.data.find(
        (item) => item.id === provinceId
      );
      return found
        ? { province: found.province_name, district: found.district_name }
        : defaultValue;
    } else {
      return defaultValue;
    }
  }

  const mainContent = (
    <div>
      <Link
        className="flex items-center space-x-1 text-gray-500 mb-2"
        to="/customer-infos/orders-history"
      >
        <BiArrowBack size={20} />
        <p className="text-[15px]">Trở lại</p>
      </Link>
      {ordersByIdError || ordersByIdIsLoading ? (
        <Skeleton />
      ) : ordersByIdData ? (
        <>
          <div className="mb-3 p-4 bg-white rounded-lg">
            <div className="grid grid-cols-1 divide-y">
              <div className="flex items-center justify-between py-3">
                <span className="text-[15px] text-gray-500">Mã đơn hàng:</span>
                <span className="text-[15px] font-bold">
                  {ordersByIdData.data.order_detail.id}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[15px] text-gray-500">
                  Ngày đặt hàng:
                </span>
                <span className="text-[15px]">
                  {changeFormatData(ordersByIdData.data.order_detail.created)}
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-[15px] text-gray-500">Tình trạng:</span>
                <span
                  className="rounded-lg py-2 px-4 text-white text-[15px]"
                  style={{
                    backgroundColor: getOrderStatusColor(
                      ordersByIdData.data.order_detail.orders_status
                    ),
                  }}
                >
                  {getOrderStatusText(
                    ordersByIdData.data.order_detail.orders_status
                  )}
                </span>
              </div>
            </div>
            <button className="rounded-lg h-[30px] w-[270px] text-[15px] bg-transparent text-blue-700 border border-blue-700 mx-auto my-2 block">
              Xuất PDF
            </button>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <div className="grid grid-cols-1 divide-y ">
              <div className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">
                    Tên khách hàng:
                  </span>
                  <span className="text-[15px]">
                    {ordersByIdData.data.ship_address_detail.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">Điện thoại:</span>
                  <span className="text-[15px]">
                    {ordersByIdData.data.ship_address_detail.phone_number}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">E-mail:</span>
                  <span className="text-[15px]">
                    {ordersByIdData.data.ship_address_detail.email}
                  </span>
                </div>
              </div>
              <div className="py-3">
                <div className="flex justify-between">
                  <span className="text-[15px] text-gray-500">
                    Địa chỉ nhận hàng:
                  </span>
                  <div className="text-[15px] text-right">
                    <p className="text-[15px]">
                      {ordersByIdData.data.ship_address_detail.exact_address}
                    </p>
                    <p className="text-[15px]">
                      {
                        getProvincesAndShopById(
                          ordersByIdData.data.ship_address_detail.province_id
                        ).district
                      }
                    </p>
                    <p className="text-[15px]">
                      {
                        getProvincesAndShopById(
                          ordersByIdData.data.ship_address_detail.province_id
                        ).province
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">
                    Phương thức thanh toán:
                  </span>
                  <span className="text-[15px]">
                    {getPaymentText(ordersByIdData.data.order_detail.payment)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">
                    Tình trạng thanh toán:
                  </span>
                  <span
                    className="text-[15px]"
                    style={{
                      color: getPaymentStatusColor(
                        ordersByIdData.data.order_detail.payment_status
                      ),
                    }}
                  >
                    {getPaymentStatusText(
                      ordersByIdData.data.order_detail.payment_status
                    )}
                  </span>
                </div>
              </div>
              <div className="py-3">
                <p className="text-[15px] text-gray-500 mb-2">Sản phẩm</p>
                {ordersByIdData.data.ordered_items.map((item) => (
                  <div
                    key={item.products_entity.id}
                    className="flex items-center jusityf-between border border-gray-300 rounded-lg mb-3 overflow-hidden p-3"
                  >
                    <div className="grow flex items-center space-x-2">
                      <Link to={`/products/${item.products_entity.id}`}>
                        <img
                          src={getFullPathImage(
                            item.products_entity.showcase_image
                          )}
                          className="object-cover w-16 h-16"
                        />
                      </Link>
                      <div>
                        <Link to={`/products/${item.products_entity.id}`}>
                          <p className="font-semibold hover:text-blue-700 inline text-[15px]">
                            {item.products_entity.name}
                          </p>
                        </Link>
                        {item.products_entity.extra_product_type && (
                          <ProductsExtraCartProperty
                            title="Loại Sản Phẩm"
                            value={item.products_entity.extra_product_type}
                          />
                        )}
                        {item.products_entity.extra_strap_type && (
                          <ProductsExtraCartProperty
                            title="Loại Dây"
                            value={item.products_entity.extra_strap_type}
                          />
                        )}
                        {item.products_entity.extra_gpu_type && (
                          <ProductsExtraCartProperty
                            title="GPU"
                            value={item.products_entity.extra_gpu_type}
                          />
                        )}
                        {item.products_entity.extra_storage_type && (
                          <ProductsExtraCartProperty
                            title="Dung Lượng"
                            value={item.products_entity.extra_storage_type}
                          />
                        )}
                        {item.products_entity.extra_ram_type && (
                          <ProductsExtraCartProperty
                            title="RAM"
                            value={item.products_entity.extra_ram_type}
                          />
                        )}
                        {item.products_entity.extra_model_type && (
                          <ProductsExtraCartProperty
                            title="Model"
                            value={item.products_entity.extra_model_type}
                          />
                        )}
                        {item.products_entity.extra_screen_size && (
                          <ProductsExtraCartProperty
                            title="Màn hình"
                            value={item.products_entity.extra_screen_size}
                          />
                        )}
                      </div>
                    </div>
                    <p>SL: {item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="py-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-gray-500">
                    Tổng số tiền đã đặt hàng:
                  </span>
                  <span className="text-2xl font-bold text-blue-700">
                    {formatCurrency(
                      ordersByIdData.data.order_detail.total_price
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
