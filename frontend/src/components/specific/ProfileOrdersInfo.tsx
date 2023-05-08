import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/userApi";
import {
  formatCurrency,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentText,
} from "../../utils/helper";
import CustomerInfosContainer from "./CustomerInfosContainer";

export default function ProfileOrdersInfo() {
  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersIsLoading,
  } = useGetOrdersQuery();

  const Skeleton = () => (
    <div className="w-full animate-pulse">
      <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
      <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
    </div>
  );

  const mainContent = (
    <div className="w-full">
      {ordersError || ordersIsLoading ? (
        <Skeleton />
      ) : ordersData ? (
        ordersData.data.length === 0 ? (
          <div className="p-4 bg-white rounded-lg">
            <p className="text-sm text-gray-500">Bạn chưa đặt đơn hàng nào</p>
          </div>
        ) : (
          [...ordersData.data]
            .sort((a, b) => {
              if (a.created > b.created) {
                return -1;
              }
              if (a.created < b.created) {
                return 1;
              }
              return 0;
            })
            .map((item) => (
              <div
                key={item.id}
                className="flex space-x-4 p-4 bg-white rounded-lg mb-3"
              >
                <div className="grow">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">Mã đơn hàng:</span>
                    <span className="text-sm">{item.id}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">
                      Ngày đặt hàng:
                    </span>
                    <span className="text-sm">{item.created}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">Tổng tiền:</span>
                    <span className="text-sm font-bold">
                      {formatCurrency(item.total_price)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-sm">
                      Phương thức thanh toán:
                    </span>
                    <span className="text-sm font-bold">
                      {getPaymentText(item.payment)}
                    </span>
                  </div>
                  <Link
                    className="text-sm text-blue-700"
                    to={`/customer-infos/orders-history/${item.id}`}
                  >
                    Xem chi tiết
                  </Link>
                </div>
                <div>
                  <p
                    className="rounded-lg py-2 px-4 text-white text-sm"
                    style={{
                      backgroundColor: getOrderStatusColor(item.orders_status),
                    }}
                  >
                    {getOrderStatusText(item.orders_status)}
                  </p>
                </div>
              </div>
            ))
        )
      ) : (
        <Skeleton />
      )}
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
