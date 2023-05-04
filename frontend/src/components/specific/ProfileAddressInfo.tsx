import { Formik } from "formik";
import { AiOutlineDown, AiOutlineLoading } from "react-icons/ai";
import { DEFAULT_DISTRICT, DEFAULT_PROVINCE } from "../../pages/ShoppingCart";
import { useGetProvincesAndShopsQuery } from "../../redux/api/addressApi";
import {
  useCreateCustomerShipAddressesMutation,
  useGetCustomerShipAddressesQuery,
} from "../../redux/api/userApi";
import CustomerInfosContainer from "./CustomerInfosContainer";

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
    error: getddressesError,
    isLoading: getssesIsLoading,
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

  const mainContent = (
    <div className="w-full p-4">
      <Formik
        initialValues={{
          name: "",
          email: "",
          phoneNumber: "",
          province: DEFAULT_PROVINCE,
          district: DEFAULT_DISTRICT,
          exactAddress: "",
        }}
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
        onSubmit={async (values, { setSubmitting }) => {
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
            }).unwrap();
            setSubmitting(false);
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
                    {errors.province && touched.province && errors.province}
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
                                (item) => item.province_name === values.province
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
                    {errors.district && touched.district && errors.district}
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
                isSubmitting ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-500"
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
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
