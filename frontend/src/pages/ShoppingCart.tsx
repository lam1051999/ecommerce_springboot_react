import { AiOutlineDown } from "react-icons/ai";
import bankImage from "/images/payment/options/bank.jpeg";
import kredivoImage from "/images/payment/options/kredivo.jpeg";
import onepayImage from "/images/payment/options/onepay.png";
import payooImage from "/images/payment/options/payoo.png";
import { formatCurrency, getFullPathImage } from "../utils/helper";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { RxTrash } from "react-icons/rx";
import ProductsExtraCartProperty from "../components/common/ProductsExtraCartProperty";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import {
  decrement,
  increment,
  removeCartItem,
} from "../redux/slices/shoppingCartSlice";
import { ChangeEvent, useState } from "react";
import { useGetProvincesAndShopsQuery } from "../redux/api/addressApi";
import { ProvincesAndShopsResponse } from "../redux/types/types";
import { Link } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";

export const DEFAULT_PROVINCE = "Chọn tỉnh, thành phố:";
export const DEFAULT_DISTRICT = "Quận, huyện:";
export const DEFAULT_SHOP = "Mời bạn chọn địa chỉ cửa hàng";

export default function ShoppingCart() {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();
  const [receiveType, setReceiveType] = useState("STORE");
  const [payment, setPayment] = useState("BANK");
  const { data, error, isLoading } = useGetProvincesAndShopsQuery();
  const [province, setProvince] = useState(DEFAULT_PROVINCE);
  const [district, setDistrict] = useState(DEFAULT_DISTRICT);
  const [shop, setShop] = useState(DEFAULT_SHOP);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isExtractReceipt, setIsExtractReceipt] = useState(false);
  const [isAcceptContract, setIsAcceptContract] = useState(false);
  const [address, setAddress] = useState("");

  function handleChangeReceiveType(event: ChangeEvent<HTMLInputElement>) {
    setReceiveType(event.target.value);
  }
  function getShops(
    data: ProvincesAndShopsResponse,
    provinceName: string,
    districtName: string
  ) {
    const found = data.data.find(
      (item) =>
        item.province_name === provinceName &&
        item.district_name === districtName
    );
    return found ? [...found.list_shops] : [];
  }

  return (
    <PageContainer>
      {cartItems.length > 0 ? (
        <div className="flex space-x-[20px] w-full mt-4 mb-20">
          <div className="w-[70%]">
            <div className="bg-white rounded-xl w-full px-6 pt-3 pb-5">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #d1d5db" }}>
                    <th className="text-left py-4">Hình ảnh</th>
                    <th className="text-left py-4">Tên sản phẩm</th>
                    <th className="text-left py-4">Giá bán</th>
                    <th className="text-left py-4">Số lượng</th>
                    <th className="text-left py-4" />
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom:
                          index !== cartItems.length - 1
                            ? "1px solid #d1d5db"
                            : "",
                      }}
                    >
                      <td className="py-6 align-top">
                        <img
                          src={getFullPathImage(item.showcase_image)}
                          className="object-cover w-20 h-20"
                        />
                      </td>
                      <td className="py-6 align-top w-[40%]">
                        <div className="w-full">
                          <p className="font-semibold">{item.name}</p>
                          {item.extra_product_type && (
                            <ProductsExtraCartProperty
                              title="Loại Sản Phẩm"
                              value={item.extra_product_type}
                            />
                          )}
                          {item.extra_strap_type && (
                            <ProductsExtraCartProperty
                              title="Loại Dây"
                              value={item.extra_strap_type}
                            />
                          )}
                          {item.extra_gpu_type && (
                            <ProductsExtraCartProperty
                              title="GPU"
                              value={item.extra_gpu_type}
                            />
                          )}
                          {item.extra_storage_type && (
                            <ProductsExtraCartProperty
                              title="Dung Lượng"
                              value={item.extra_storage_type}
                            />
                          )}
                          {item.extra_ram_type && (
                            <ProductsExtraCartProperty
                              title="RAM"
                              value={item.extra_ram_type}
                            />
                          )}
                          {item.extra_model_type && (
                            <ProductsExtraCartProperty
                              title="Model"
                              value={item.extra_model_type}
                            />
                          )}
                          {item.extra_screen_size && (
                            <ProductsExtraCartProperty
                              title="Màn hình"
                              value={item.extra_screen_size}
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-6 align-top font-semibold">
                        {formatCurrency(item.actual_price)}
                      </td>
                      <td className="py-6 align-top">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => dispatch(decrement(item.id))}
                            className="border border-blue-700 text-blue-700 p-1 rounded"
                          >
                            <BsDashLg size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => dispatch(increment(item.id))}
                            className="border border-blue-700 text-blue-700 p-1 rounded"
                          >
                            <BsPlusLg size={12} />
                          </button>
                        </div>
                      </td>
                      <td className="py-6 align-top">
                        <button
                          onClick={() => dispatch(removeCartItem(item.id))}
                        >
                          <RxTrash size={25} className="text-gray-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center space-x-5 justify-end mt-5">
                <button className="text-center py-2 border w-40 text-sm rounded-lg text-blue-700 border-blue-700">
                  Cập nhật giỏ hàng
                </button>
                <Link to="/">
                  <button className="text-center py-2 border w-40 text-sm rounded-lg text-blue-700 border-blue-700">
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>
            </div>
            <h1 className="text-2xl font-bold my-4">Thông tin thanh toán</h1>
            <div className="bg-white rounded-xl w-full px-6 pt-6 pb-1">
              <div>
                <input
                  placeholder="Tên"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-white"
                />
                <div className="flex items-center space-x-4 my-4">
                  <input
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="flex-1 p-3 text-gray-900 border border-gray-300 rounded-lg bg-white"
                  />
                  <input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="flex-1 p-3 text-gray-900 border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <p className="text-sm font-bold">Hình thức nhận hàng</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="w-[49%]">
                    <p className="text-sm">Tỉnh, thành phố:</p>
                    <div className="relative text-gray-400">
                      <select
                        value={province}
                        onChange={(event) => setProvince(event.target.value)}
                        className="appearance-none p-3	w-full border border-gray-300 rounded-lg bg-white h-12"
                      >
                        <option>{DEFAULT_PROVINCE}</option>
                        {data
                          ? Array.from(
                              new Set(
                                data.data.map((item) => item.province_name)
                              )
                            )
                              .sort()
                              .map((item, index) => (
                                <option key={index}>{item}</option>
                              ))
                          : null}
                      </select>
                      <AiOutlineDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-2"
                      />
                    </div>
                  </div>
                  <div className="w-[49%]">
                    <p className="text-sm">Quận, huyện:</p>
                    <div className="relative text-gray-400">
                      <select
                        value={district}
                        onChange={(event) => setDistrict(event.target.value)}
                        className="appearance-none p-3	w-full border border-gray-300 rounded-lg bg-white h-12"
                      >
                        <option>{DEFAULT_DISTRICT}</option>
                        {data
                          ? Array.from(
                              new Set(
                                data.data
                                  .filter(
                                    (item) => item.province_name === province
                                  )
                                  .map((item) => item.district_name)
                              )
                            )
                              .sort()
                              .map((item, index) => (
                                <option key={index}>{item}</option>
                              ))
                          : null}
                      </select>
                      <AiOutlineDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 my-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      value="STORE"
                      onChange={handleChangeReceiveType}
                      checked={receiveType === "STORE"}
                    />
                    <p className="text-sm">Nhận tại cửa hàng</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="address"
                      value="HOME"
                      onChange={handleChangeReceiveType}
                      checked={receiveType === "HOME"}
                    />
                    <p className="text-sm">Giao tận nơi</p>
                  </div>
                </div>
                <div>
                  {receiveType === "STORE" ? (
                    <div className="relative text-gray-400">
                      <select
                        value={shop}
                        onChange={(event) => setShop(event.target.value)}
                        className="appearance-none p-3	w-full border border-gray-300 rounded-lg bg-white h-12"
                      >
                        <option>{DEFAULT_SHOP}</option>
                        {data
                          ? getShops(data, province, district)
                              .sort()
                              .map((item, index) => (
                                <option key={index}>{item.name}</option>
                              ))
                          : null}
                      </select>
                      <AiOutlineDown
                        size={15}
                        className="absolute right-3 top-1/2 -translate-y-2"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm">Địa chỉ cụ thể:</p>
                      <input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Nhập địa chỉ"
                        className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-white"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 my-4">
                  <input
                    type="checkbox"
                    checked={isExtractReceipt}
                    onChange={() =>
                      setIsExtractReceipt((prevState) => !prevState)
                    }
                  />
                  <p className="text-sm">Xuất hoá đơn công ty</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl w-full px-6 py-6 mt-4">
              <p className="text-sm font-bold">Thông tin thanh toán</p>
              <p className="text-sm text-gray-600 my-4">
                Quý khách vui lòng lựa chọn các hình thức thanh toán dưới đây:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPayment("BANK")}
                  className="flex items-center space-x-4 p-3 text-sm text-left text-gray-700 font-bold border border-gray-300 rounded-lg bg-white"
                >
                  <input
                    name="payment"
                    onChange={(event) => setPayment(event.target.value)}
                    checked={payment === "BANK"}
                    value="BANK"
                    type="radio"
                  />
                  <div className="w-8 h-8">
                    <img src={bankImage} className="object-cover" />
                  </div>
                  <p>Chuyển khoản ngân hàng</p>
                </button>
                <button
                  onClick={() => setPayment("ONEPAY")}
                  className="flex items-center space-x-4 p-3 text-sm text-left text-gray-700 font-bold border border-gray-300 rounded-lg bg-white"
                >
                  <input
                    name="payment"
                    onChange={(event) => setPayment(event.target.value)}
                    checked={payment === "ONEPAY"}
                    value="ONEPAY"
                    type="radio"
                  />
                  <div className="w-8 h-8">
                    <img src={onepayImage} className="object-cover" />
                  </div>
                  <p>Thanh toán OnePay</p>
                </button>
                <button
                  onClick={() => setPayment("PAYOO")}
                  className="flex items-center space-x-4 p-3 text-sm text-left text-gray-700 font-bold border border-gray-300 rounded-lg bg-white"
                >
                  <input
                    name="payment"
                    onChange={(event) => setPayment(event.target.value)}
                    checked={payment === "PAYOO"}
                    value="PAYOO"
                    type="radio"
                  />
                  <div className="w-8 h-8">
                    <img src={payooImage} className="object-cover" />
                  </div>
                  <p>Thanh toán Payoo</p>
                </button>
                <button
                  onClick={() => setPayment("KREDIVO")}
                  className="flex items-center space-x-4 p-3 text-sm text-left text-gray-700 font-bold border border-gray-300 rounded-lg bg-white"
                >
                  <input
                    name="payment"
                    onChange={(event) => setPayment(event.target.value)}
                    checked={payment === "KREDIVO"}
                    value="KREDIVO"
                    type="radio"
                  />
                  <div className="w-8 h-8">
                    <img src={kredivoImage} className="object-cover" />
                  </div>
                  <p>Thanh toán Kredivo</p>
                </button>
              </div>
            </div>
          </div>
          <div className="w-[30%] relative">
            <div className="w-full bg-white rounded-lg px-4 pt-6 pb-10 sticky top-[5rem]">
              <div className="relative">
                <input
                  className="w-full p-3 pr-36 text-gray-900 border border-gray-300 rounded-lg bg-white"
                  placeholder="Mã giảm giá"
                />
                <button className="text-white absolute h-full w-32 right-0 bg-blue-700 hover:bg-blue-500 font-medium rounded-e-lg text-sm p-4">
                  Áp dụng
                </button>
              </div>
              <div
                className="py-6"
                style={{ borderBottom: "1px solid #d1d5db" }}
              >
                <div className="flex items-center justify-between my-4">
                  <p className="text-sm text-gray-700">Tổng phụ:</p>
                  <p className="tracking-tight text-sm font-bold">
                    {formatCurrency(
                      cartItems.reduce((acc, item) => {
                        return acc + item.actual_price * item.quantity;
                      }, 0)
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold">Tổng cộng:</p>
                  <p className="tracking-tight font-bold text-blue-700">
                    {formatCurrency(
                      cartItems.reduce((acc, item) => {
                        return acc + item.actual_price * item.quantity;
                      }, 0)
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 my-4">
                <input
                  type="checkbox"
                  checked={isAcceptContract}
                  onChange={() =>
                    setIsAcceptContract((prevState) => !prevState)
                  }
                />
                <p className="text-sm">
                  Tôi đã đọc và đồng ý với điều khoản và điều kiện của website
                </p>
              </div>
              <button className="my-4 rounded-lg w-full py-3 text-white bg-blue-700 hover:bg-blue-500">
                Tiến hành đặt hàng
              </button>
              <p className="text-sm text-[#dc3545]">
                (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-sm my-5">
          Giỏ hàng của bạn đang trống!
        </p>
      )}
    </PageContainer>
  );
}
