import { Formik } from "formik";
import { AiOutlineDown, AiOutlineLoading } from "react-icons/ai";
import { DEFAULT_DISTRICT, DEFAULT_PROVINCE } from "../../pages/ShoppingCart";
import { useGetProvincesAndShopsQuery } from "../../redux/api/addressApi";
import {
  useCreateCustomerShipAddressesMutation,
  useDeleteCustomerShipAddressesMutation,
  useGetCustomerShipAddressesQuery,
} from "../../redux/api/userApi";
import CustomerInfosContainer from "./CustomerInfosContainer";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const formInitialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  province: DEFAULT_PROVINCE,
  district: DEFAULT_DISTRICT,
  exactAddress: "",
};

type AddAddressFormikError = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  province?: string;
  district?: string;
  exactAddress?: string;
};

export default function ProfileAddressInfo() {
  const { data: provincesAndShopsData } = useGetProvincesAndShopsQuery();
  const {
    data: getAddressesData,
    error: getAddressesError,
    isLoading: getAddressesIsLoading,
  } = useGetCustomerShipAddressesQuery();
  const [
    createCustomerShipAddresses,
    {
      isError: createAddressesIsError,
      isSuccess: createAddressesIsSuccess,
      error: createAddressesError,
      data: createAddressesData,
      isLoading: createAddressesIsLoading,
    },
  ] = useCreateCustomerShipAddressesMutation();
  const [
    deleteCustomerShipAddresses,
    {
      isError: deleteAddressesIsError,
      isSuccess: deleteAddressesIsSuccess,
      error: deleteAddressesError,
      data: deleteAddressesData,
      isLoading: deleteAddressesIsLoading,
    },
  ] = useDeleteCustomerShipAddressesMutation();
  const [isCreatingAddresses, setIsCreatingAddresses] = useState(false);

  async function handleDeleteAddresses(id: string) {
    const confirmDelete = confirm("Bạn có chắc không?");
    if (confirmDelete) {
      await deleteCustomerShipAddresses(id)
        .unwrap()
        .then(() => {
          alert("Xoá địa chỉ thành công");
        })
        .catch(() => {
          alert("Xoá địa chỉ thất bại");
        });
    }
  }

  const mainContent = (
    <div className="w-full overflow-hidden">
      <div
        className="grid grid-cols-2 w-[200%] transition-transform duration-500 ease-in-out"
        style={{
          transform: isCreatingAddresses ? "translateX(-50%)" : "translateX(0)",
        }}
      >
        <div className="w-full">
          {getAddressesError || getAddressesIsLoading ? (
            <div className="w-full animate-pulse">
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
            </div>
          ) : getAddressesData ? (
            getAddressesData.data.length === 0 ? (
              <div className="w-full h-full p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-500">Không có địa chỉ</p>
                <button
                  onClick={() => setIsCreatingAddresses(true)}
                  className="block my-4 rounded-lg w-36 text-white text-sm h-[40px] mx-auto bg-blue-700 hover:bg-blue-500"
                >
                  Thêm mới
                </button>
              </div>
            ) : (
              <div className="w-full">
                {getAddressesData.data.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 divide-y mb-5 p-4 bg-white rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-[15px]">
                        <FaMapMarkerAlt size={15} />
                        <p>Địa chỉ</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="rounded w-24 h-[30px] text-white text-sm bg-blue-700 hover:bg-blue-500 flex items-center justify-center space-x-1">
                          <MdEdit size={18} />
                          <span>Sửa</span>
                        </button>
                        <button
                          onClick={() => handleDeleteAddresses(item.id)}
                          className="rounded w-24 h-[30px] text-sm flex items-center justify-center space-x-1 bg-transparent text-[#FA5B46] border border-[#FA5B46]"
                        >
                          <FaTrashAlt size={15} />
                          <span>Xóa</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-2 mt-4">
                        <span className="text-gray-500">Tên:</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 my-2">
                        <span className="text-gray-500">Email:</span>
                        <span>{item.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 my-2">
                        <span className="text-gray-500">Số điện thoại:</span>
                        <span>{item.phone_number}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-2 mb-4">
                        <span className="text-gray-500">Địa chỉ:</span>
                        <span>{item.exact_address}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setIsCreatingAddresses(true)}
                  className="block my-4 rounded-lg w-36 text-white text-sm h-[40px] mx-auto bg-blue-700 hover:bg-blue-500"
                >
                  Thêm mới
                </button>
              </div>
            )
          ) : (
            <div className="w-full animate-pulse">
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
              <div className="w-full bg-gray-300 mb-2 h-[15vh]" />
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="p-4 bg-white rounded-lg">
            <button
              className="flex items-center space-x-1 text-gray-500 mb-4"
              onClick={() => setIsCreatingAddresses(false)}
            >
              <BiArrowBack size={20} />
              <p className="text-sm">Trở lại</p>
            </button>
            <Formik
              initialValues={formInitialValues}
              validate={(values) => {
                const errors: AddAddressFormikError = {};
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
                }
                if (values.province === DEFAULT_PROVINCE) {
                  errors.province = "Trường bắt buộc.";
                }
                if (values.district === DEFAULT_DISTRICT) {
                  errors.district = "Trường bắt buộc.";
                }
                if (!values.exactAddress) {
                  errors.exactAddress = "Trường bắt buộc.";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                if (provincesAndShopsData) {
                  const found = provincesAndShopsData.data.find(
                    (item) =>
                      item.province_name === values.province &&
                      item.district_name === values.district
                  );
                  await createCustomerShipAddresses({
                    name: values.name,
                    phone_number: values.phoneNumber,
                    email: values.email,
                    exact_address: values.exactAddress,
                    province_id: found ? found.id : "DEFAULT_ID",
                  })
                    .unwrap()
                    .then(() => {
                      resetForm();
                    })
                    .finally(() => {
                      setSubmitting(false);
                      setIsCreatingAddresses(false);
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
                >
                  <div>
                    <p className="text-sm">Tên, Họ:</p>
                    <input
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
                      <p className="text-sm">Điện thoại:</p>
                      <input
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
                      <p className="text-sm">E-mail:</p>
                      <input
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
                  <div className="flex space-x-4 mt-4">
                    <div className="flex-1">
                      <p className="text-sm">Tỉnh, thành phố:</p>
                      <div className="relative text-gray-400">
                        <select
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="province"
                          value={values.province}
                          className="appearance-none p-3	w-full border border-gray-300 rounded-lg bg-white h-12"
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
                          className="appearance-none p-3	w-full border border-gray-300 rounded-lg bg-white h-12"
                        >
                          <option>{DEFAULT_DISTRICT}</option>
                          {provincesAndShopsData
                            ? Array.from(
                                new Set(
                                  provincesAndShopsData.data
                                    .filter(
                                      (item) =>
                                        item.province_name === values.province
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
                  <div className="mt-4">
                    <p className="text-sm">Địa chỉ cụ thể:</p>
                    <input
                      value={values.exactAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="exactAddress"
                      className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-red-500">
                      {errors.exactAddress &&
                        touched.exactAddress &&
                        errors.exactAddress}
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`my-4 rounded-lg w-40 text-white h-[40px] mx-auto flex items-center justify-center ${
                      isSubmitting
                        ? "bg-blue-500"
                        : "bg-blue-700 hover:bg-blue-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <AiOutlineLoading className="animate-spin" size={25} />
                    ) : (
                      <span>Lưu lại</span>
                    )}
                  </button>
                  {createAddressesIsLoading ? null : createAddressesIsSuccess ? (
                    <p className="text-xs text-center text-[#28a745] font-semibold">
                      Tạo địa chỉ nhận hàng thành công
                    </p>
                  ) : createAddressesIsError ? (
                    <p className="text-xs text-center text-[#dc3545] font-semibold">
                      Đã có lỗi xảy ra, chưa tạo được địa chỉ nhận hàng
                    </p>
                  ) : null}
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
