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
  resetCart,
} from "../redux/slices/shoppingCartSlice";
import { useGetProvincesAndShopsQuery } from "../redux/api/addressApi";
import {
  CustomerShipAddressesEntity,
  ProvincesAndShopsResponse,
} from "../redux/types/types";
import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import {
  useCreateCustomerShipAddressesMutation,
  useGetCustomerShipAddressesQuery,
  usePlaceOrderMutation,
} from "../redux/api/userApi";
import { Formik } from "formik";
import SubmitButton from "../components/common/SubmitButton";
import { useState } from "react";

export const DEFAULT_PROVINCE = "Chọn tỉnh, thành phố:";
export const DEFAULT_DISTRICT = "Quận, huyện:";
export const DEFAULT_SHOP = "Mời bạn chọn địa chỉ cửa hàng";
export const DEFAULT_ADDRESS = "Địa chỉ mới";

type ShoppingCartFormikError = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
  isAcceptContract?: string;
};

export default function ShoppingCart() {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const dispatch = useAppDispatch();
  const [addedAddressId, setAddedAddressId] = useState(DEFAULT_ADDRESS);
  const navigate = useNavigate();

  const {
    data: provincesAndShopsData,
    error: provincesAndShopsError,
    isLoading: provincesAndShopsIsLoading,
  } = useGetProvincesAndShopsQuery();
  const {
    data: getAddressesData,
    error: getAddressesError,
    isLoading: getAddressesIsLoading,
  } = useGetCustomerShipAddressesQuery();
  const [
    placeOrder,
    {
      isError: placeOrderIsError,
      isSuccess: placeOrderIsSuccess,
      error: placeOrderError,
      data: placeOrderData,
    },
  ] = usePlaceOrderMutation();
  const [
    createShipAddress,
    {
      isError: createShipAddressIsError,
      isSuccess: createShipAddressIsSuccess,
      error: createShipAddressError,
      data: createShipAddressData,
    },
  ] = useCreateCustomerShipAddressesMutation();

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
  function getFullAddress(
    provincesAndShops: ProvincesAndShopsResponse | undefined,
    addressItem: CustomerShipAddressesEntity
  ) {
    const addressComp = [
      addressItem.phone_number,
      addressItem.name,
      addressItem.exact_address,
    ];
    if (provincesAndShops) {
      const matched = provincesAndShops.data.find(
        (item) => item.id === addressItem.province_id
      );
      if (matched) {
        addressComp.push(matched.district_name);
        addressComp.push(matched.province_name);
      }
    }
    return addressComp.join(", ");
  }
  function getChosenOptionId(
    event: React.ChangeEvent<HTMLSelectElement>
  ): string {
    const index = event.target.selectedIndex;
    const el = event.target.children[index];
    const id = el.getAttribute("id");
    return id ? id : DEFAULT_ADDRESS;
  }

  return (
    <PageContainer>
      {cartItems.length > 0 ? (
        <Formik
          initialValues={{
            addedAddress: DEFAULT_ADDRESS,
            name: "",
            email: "",
            phoneNumber: "",
            province: DEFAULT_PROVINCE,
            district: DEFAULT_DISTRICT,
            shop: DEFAULT_SHOP,
            exactAddress: "",
            receiveType: "STORE",
            isExtractReceipt: false,
            payment: "BANK",
            isAcceptContract: false,
          }}
          validate={(values) => {
            const errors: ShoppingCartFormikError = {};
            if (values.addedAddress === DEFAULT_ADDRESS) {
              if (!values.name) {
                errors.name = "Trường bắt buộc.";
              }
              if (!values.email) {
                errors.email = "Trường bắt buộc.";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Địa chỉ email không hợp lệ.";
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Trường bắt buộc.";
              } else if (
                !/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(
                  values.phoneNumber
                )
              ) {
                errors.phoneNumber = "Số điện thoại không hợp lệ.";
              }
              if (values.province === DEFAULT_PROVINCE) {
                errors.province = "Trường bắt buộc.";
              }
              if (values.district === DEFAULT_DISTRICT) {
                errors.district = "Trường bắt buộc.";
              }
            }
            if (!values.isAcceptContract) {
              errors.isAcceptContract =
                "Vui lòng chấp nhận các điều khoản dịch vụ trước bước tiếp theo.";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (values.addedAddress === DEFAULT_ADDRESS) {
              if (provincesAndShopsData) {
                const found = provincesAndShopsData.data.find(
                  (item) =>
                    item.province_name === values.province &&
                    item.district_name === values.district
                );
                await createShipAddress({
                  name: values.name,
                  email: values.email,
                  phone_number: values.phoneNumber,
                  exact_address:
                    values.receiveType === "STORE"
                      ? values.shop
                      : values.exactAddress,
                  province_id: found ? found.id : "DEFAULT_ID",
                })
                  .unwrap()
                  .then(async (shipAddressResult) => {
                    const shipAddressId = shipAddressResult.data;
                    await placeOrder({
                      is_extract_receipt: values.isExtractReceipt ? 1 : 0,
                      payment: values.payment,
                      receive_type: values.receiveType,
                      ship_address_id: shipAddressId,
                      total_price: cartItems.reduce((acc, item) => {
                        return acc + item.actual_price * item.quantity;
                      }, 0),
                      list_products_in_order: cartItems.map((item) => ({
                        name: item.name,
                        product_id: item.id,
                        quantity: item.quantity,
                      })),
                    })
                      .unwrap()
                      .then(() => {
                        alert("Đặt đơn thành công");
                        dispatch(resetCart());
                        navigate("/customer-infos/orders-history");
                      })
                      .catch((error) => {
                        alert(error.data.message);
                      });
                  })
                  .catch(() => {
                    alert("Tạo địa chỉ mới thất bại, chưa thể đặt đơn hàng");
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              } else {
                alert(
                  "Không thể lấy thông tin tỉnh, huyện, và địa chỉ cửa hàng shopdunk"
                );
              }
            } else {
              await placeOrder({
                is_extract_receipt: values.isExtractReceipt ? 1 : 0,
                payment: values.payment,
                receive_type: "HOME",
                ship_address_id: addedAddressId,
                total_price: cartItems.reduce((acc, item) => {
                  return acc + item.actual_price * item.quantity;
                }, 0),
                list_products_in_order: cartItems.map((item) => ({
                  name: item.name,
                  product_id: item.id,
                  quantity: item.quantity,
                })),
              })
                .unwrap()
                .then(() => {
                  alert("Đặt đơn thành công");
                  dispatch(resetCart());
                  navigate("/customer-infos/orders-history");
                })
                .catch((error) => {
                  alert(error.data.message);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }
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
              className="flex space-x-[20px] w-full mt-4 mb-20"
            >
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
                            <Link to={`/products/${item.id}`}>
                              <img
                                src={getFullPathImage(item.showcase_image)}
                                className="object-cover w-20 h-20"
                              />
                            </Link>
                          </td>
                          <td className="py-6 align-top w-[40%]">
                            <div className="w-full">
                              <Link to={`/products/${item.id}`}>
                                <p className="font-semibold hover:text-blue-700 inline">
                                  {item.name}
                                </p>
                              </Link>
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
                                type="button"
                                onClick={() => dispatch(decrement(item.id))}
                                className="border border-blue-700 text-blue-700 p-1 rounded"
                              >
                                <BsDashLg size={12} />
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => dispatch(increment(item.id))}
                                className="border border-blue-700 text-blue-700 p-1 rounded"
                              >
                                <BsPlusLg size={12} />
                              </button>
                            </div>
                          </td>
                          <td className="py-6 align-top">
                            <button
                              type="button"
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
                    <button
                      type="button"
                      className="text-center py-2 border w-40 text-sm rounded-lg text-blue-700 border-blue-700"
                    >
                      Cập nhật giỏ hàng
                    </button>
                    <Link to="/">
                      <button
                        type="button"
                        className="text-center py-2 border w-40 text-sm rounded-lg text-blue-700 border-blue-700"
                      >
                        Tiếp tục mua sắm
                      </button>
                    </Link>
                  </div>
                </div>
                <h1 className="text-2xl font-bold my-4">
                  Thông tin thanh toán
                </h1>
                <div className="bg-white rounded-xl w-full px-6 pt-6 pb-1">
                  {getAddressesError ||
                  getAddressesIsLoading ? null : getAddressesData ? (
                    getAddressesData.data.length > 0 ? (
                      <>
                        <p className="text-sm font-bold">Thông tin cá nhân</p>
                        <div className="relative text-gray-400">
                          <select
                            onChange={(event) => {
                              handleChange(event);
                              setAddedAddressId(getChosenOptionId(event));
                            }}
                            onBlur={handleBlur}
                            name="addedAddress"
                            value={values.addedAddress}
                            className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12 mt-2 mb-4"
                          >
                            {getAddressesData.data.map((item) => (
                              <option key={item.id} id={item.id}>
                                {getFullAddress(provincesAndShopsData, item)}
                              </option>
                            ))}
                            <option id={DEFAULT_ADDRESS}>
                              {DEFAULT_ADDRESS}
                            </option>
                          </select>
                          <AiOutlineDown
                            size={15}
                            className="absolute right-3 top-1/2 -translate-y-2"
                          />
                        </div>
                      </>
                    ) : null
                  ) : null}
                  {values.addedAddress === DEFAULT_ADDRESS && (
                    <>
                      <div>
                        <input
                          placeholder="Tên"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="name"
                          className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                        />
                        <p className="text-xs text-red-500">
                          {errors.name && touched.name && errors.name}
                        </p>
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <div className="flex-1">
                          <input
                            placeholder="Số điện thoại"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="phoneNumber"
                            value={values.phoneNumber}
                            className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                          />
                          <p className="text-xs text-red-500">
                            {errors.phoneNumber &&
                              touched.phoneNumber &&
                              errors.phoneNumber}
                          </p>
                        </div>
                        <div className="flex-1">
                          <input
                            placeholder="Email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email}
                            className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                          />
                          <p className="text-xs text-red-500">
                            {errors.email && touched.email && errors.email}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold mt-4 mb-1">
                        Hình thức nhận hàng
                      </p>
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <p className="text-sm">Tỉnh, thành phố:</p>
                          <div className="relative text-gray-400">
                            <select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="province"
                              value={values.province}
                              className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                            >
                              <option>{DEFAULT_PROVINCE}</option>
                              {provincesAndShopsData
                                ? Array.from(
                                    new Set(
                                      provincesAndShopsData.data.map(
                                        (item) => item.province_name
                                      )
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
                            <p className="text-xs text-red-500">
                              {errors.province &&
                                touched.province &&
                                errors.province}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">Quận, huyện:</p>
                          <div className="relative text-gray-400">
                            <select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="district"
                              value={values.district}
                              className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                            >
                              <option>{DEFAULT_DISTRICT}</option>
                              {provincesAndShopsData
                                ? Array.from(
                                    new Set(
                                      provincesAndShopsData.data
                                        .filter(
                                          (item) =>
                                            item.province_name ===
                                            values.province
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
                            <p className="text-xs text-red-500">
                              {errors.district &&
                                touched.district &&
                                errors.district}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 my-4">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="receiveType"
                            value="STORE"
                            onChange={handleChange}
                            checked={values.receiveType === "STORE"}
                            id="receiveTypeStore"
                          />
                          <label
                            htmlFor="receiveTypeStore"
                            className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                          >
                            Nhận tại cửa hàng
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="receiveType"
                            value="HOME"
                            onChange={handleChange}
                            checked={values.receiveType === "HOME"}
                            id="receiveTypeHome"
                          />
                          <label
                            htmlFor="receiveTypeHome"
                            className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                          >
                            Giao tận nơi
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        {values.receiveType === "STORE" ? (
                          <div className="relative text-gray-400">
                            <select
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="shop"
                              value={values.shop}
                              className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                            >
                              <option>{DEFAULT_SHOP}</option>
                              {provincesAndShopsData
                                ? getShops(
                                    provincesAndShopsData,
                                    values.province,
                                    values.district
                                  )
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
                              value={values.exactAddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="exactAddress"
                              placeholder="Nhập địa chỉ"
                              className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-2 mb-4">
                    <input
                      name="isExtractReceipt"
                      type="checkbox"
                      checked={values.isExtractReceipt}
                      onChange={handleChange}
                    />
                    <p className="text-sm">Xuất hoá đơn công ty</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl w-full px-6 py-6 mt-4">
                  <p className="text-sm font-bold">Thông tin thanh toán</p>
                  <p className="text-sm text-gray-600 my-4">
                    Quý khách vui lòng lựa chọn các hình thức thanh toán dưới
                    đây:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center pl-6 rounded-lg text-gray-700 font-bold border border-gray-300 h-[60px]">
                      <input
                        name="payment"
                        onChange={handleChange}
                        checked={values.payment === "BANK"}
                        value="BANK"
                        type="radio"
                        id="bankRadio"
                      />
                      <label
                        htmlFor="bankRadio"
                        className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                      >
                        <div className="w-8 h-8">
                          <img src={bankImage} className="object-cover" />
                        </div>
                        <p>Chuyển khoản ngân hàng</p>
                      </label>
                    </div>
                    <div className="flex items-center pl-6 rounded-lg text-gray-700 font-bold border border-gray-300 h-[60px]">
                      <input
                        name="payment"
                        onChange={handleChange}
                        checked={values.payment === "ONEPAY"}
                        value="ONEPAY"
                        type="radio"
                        id="onpayradio"
                      />
                      <label
                        htmlFor="onpayradio"
                        className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                      >
                        <div className="w-8 h-8">
                          <img src={onepayImage} className="object-cover" />
                        </div>
                        <p>Thanh toán OnePay</p>
                      </label>
                    </div>
                    <div className="flex items-center pl-6 rounded-lg text-gray-700 font-bold border border-gray-300 h-[60px]">
                      <input
                        name="payment"
                        onChange={handleChange}
                        checked={values.payment === "PAYOO"}
                        value="PAYOO"
                        type="radio"
                        id="payooradio"
                      />
                      <label
                        htmlFor="payooradio"
                        className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                      >
                        <div className="w-8 h-8">
                          <img src={payooImage} className="object-cover" />
                        </div>
                        <p>Thanh toán Payoo</p>
                      </label>
                    </div>
                    <div className="flex items-center pl-6 rounded-lg text-gray-700 font-bold border border-gray-300 h-[60px]">
                      <input
                        name="payment"
                        onChange={handleChange}
                        checked={values.payment === "KREDIVO"}
                        value="KREDIVO"
                        type="radio"
                        id="kredivoradio"
                      />
                      <label
                        htmlFor="kredivoradio"
                        className="w-full h-full ml-3 text-sm flex items-center space-x-3 cursor-pointer"
                      >
                        <div className="w-8 h-8">
                          <img src={kredivoImage} className="object-cover" />
                        </div>
                        <p>Thanh toán Kredivo</p>
                      </label>
                    </div>
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
                    <button
                      type="button"
                      className="text-white absolute h-full w-32 right-0 bg-blue-700 hover:bg-blue-500 font-medium rounded-e-lg text-sm p-4"
                    >
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
                      name="isAcceptContract"
                      type="checkbox"
                      checked={values.isAcceptContract}
                      onChange={handleChange}
                    />
                    <p className="text-sm">
                      Tôi đã đọc và đồng ý với điều khoản và điều kiện của
                      website
                    </p>
                  </div>
                  <p className="text-xs text-red-500">
                    {errors.isAcceptContract &&
                      touched.isAcceptContract &&
                      errors.isAcceptContract}
                  </p>
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    text="Tiến hành đặt hàng"
                    width="100%"
                  />
                  <p className="text-sm text-[#dc3545]">
                    (*) Phí phụ thu sẽ được tính khi bạn tiến hành thanh toán.
                  </p>
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <p className="text-center text-gray-600 text-sm my-5">
          Giỏ hàng của bạn đang trống!
        </p>
      )}
    </PageContainer>
  );
}
