import { Formik } from "formik";
import { DEFAULT_DISTRICT, DEFAULT_PROVINCE } from "../../constants/config";
import { AiOutlineDown, AiOutlineLoading } from "react-icons/ai";
import { AddAddressFormikError } from "./ProfileAddressInfo";
import { useGetProvincesAndShopsQuery } from "../../redux/api/addressApi";
import CustomerInfosContainer from "./CustomerInfosContainer";
import {
  useGetCustomerShipAddressesByIdQuery,
  useUpdateCustomerShipAddressesByIdMutation,
} from "../../redux/api/userApi";
import { useParams } from "react-router-dom";
import {
  CustomBaseQueryError,
  ProvinceAddressDto,
  ProvincesAndShopsResponse,
} from "../../redux/types/types";
import SubmitButton from "../common/SubmitButton";
import NotFoundId from "../common/NotFoundId";

export default function AddressesUpdateForm() {
  const params = useParams();
  const { id } = params;
  if (!id) return null;
  const { data: provincesAndShopsData } = useGetProvincesAndShopsQuery();
  const {
    data: getAddressesByIdData,
    error: getAddressesByIdError,
    isLoading: getAddressesByIdIsLoading,
  } = useGetCustomerShipAddressesByIdQuery(id);
  const [
    updateAddressesById,
    {
      isError: updateAddressesByIdIsError,
      isSuccess: updateAddressesByIdIsSuccess,
      error: updateAddressesByIdError,
      data: updateAddressesByIdData,
      isLoading: updateAddressesByIdIsLoading,
    },
  ] = useUpdateCustomerShipAddressesByIdMutation();

  const Skeleton = () => (
    <div className="w-full animate-pulse">
      <div className="w-full bg-gray-300 mb-2 h-[40vh]" />
    </div>
  );
  function getProvinceValueById(
    provincesAndShopsData: ProvincesAndShopsResponse | undefined,
    id: string,
    key: keyof ProvinceAddressDto,
    defaultValue: string
  ) {
    if (provincesAndShopsData) {
      const matched = provincesAndShopsData.data.find((item) => item.id === id);
      if (matched) {
        return matched[key].toString();
      } else {
        return defaultValue;
      }
    } else {
      return defaultValue;
    }
  }

  const mainContent = getAddressesByIdIsLoading ? (
    <Skeleton />
  ) : getAddressesByIdError ? (
    (getAddressesByIdError as CustomBaseQueryError).status === 404 ? (
      <NotFoundId
        to="/customer-infos/ship-addresses"
        buttonText="Xem tất cả địa chỉ"
        title={
          <p className="text-gray-500 mb-2">
            Địa chỉ mã <strong>{id}</strong> không tồn tại
          </p>
        }
      />
    ) : (
      <Skeleton />
    )
  ) : getAddressesByIdData ? (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg">
        <Formik
          initialValues={{
            name: getAddressesByIdData.data.name,
            email: getAddressesByIdData.data.email,
            phoneNumber: getAddressesByIdData.data.phone_number,
            province: getProvinceValueById(
              provincesAndShopsData,
              getAddressesByIdData.data.province_id,
              "province_name",
              DEFAULT_PROVINCE
            ),
            district: getProvinceValueById(
              provincesAndShopsData,
              getAddressesByIdData.data.province_id,
              "district_name",
              DEFAULT_DISTRICT
            ),
            exactAddress: getAddressesByIdData.data.exact_address,
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
              await updateAddressesById({
                name: values.name,
                phone_number: values.phoneNumber,
                email: values.email,
                exact_address: values.exactAddress,
                province_id: found ? found.id : "DEFAULT_ID",
                id: id,
              })
                .unwrap()
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
              <SubmitButton
                isSubmitting={isSubmitting}
                text="Lưu lại"
                width="10rem"
              />
              {updateAddressesByIdIsLoading ? null : updateAddressesByIdIsSuccess ? (
                <p className="text-xs text-center text-[#28a745] font-semibold">
                  Cập nhật địa chỉ nhận hàng thành công
                </p>
              ) : updateAddressesByIdIsError ? (
                <p className="text-xs text-center text-[#dc3545] font-semibold">
                  Đã có lỗi xảy ra, chưa cập nhật được địa chỉ nhận hàng
                </p>
              ) : null}
            </form>
          )}
        </Formik>
      </div>
    </div>
  ) : (
    <Skeleton />
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
