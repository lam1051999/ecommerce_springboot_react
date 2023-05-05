import { Formik } from "formik";
import {
  DATE_ARRAY,
  DEFAULT_BOD_DATE,
  DEFAULT_BOD_MONTH,
  DEFAULT_BOD_YEAR,
  MONTH_ARRAY,
  SignupFormikError,
  YEAR_ARRAY,
} from "../../pages/Signup";
import { AiOutlineDown, AiOutlineLoading } from "react-icons/ai";
import {
  useGetCustomerInfosQuery,
  useUpdateCustomerInfosMutation,
} from "../../redux/api/userApi";
import CustomerInfosContainer from "./CustomerInfosContainer";

export default function ProfileAccountInfo() {
  const { data, error, isLoading } = useGetCustomerInfosQuery();
  const [
    updateInfos,
    {
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      isLoading: updateLoading,
      data: updateData,
    },
  ] = useUpdateCustomerInfosMutation();

  const mainContent = (
    <div className="bg-white rounded-lg">
      <div className="w-full p-4">
        {error || isLoading ? (
          <div className="animate-pulse w-full bg-gray-300 h-full" />
        ) : data ? (
          <div>
            <Formik
              initialValues={{
                name: data.data.name,
                email: data.data.email,
                phoneNumber: data.data.phone_number,
                gender: data.data.gender,
                dobDate: data.data.dob.split("-")[2],
                dobMonth: data.data.dob.split("-")[1],
                dobYear: data.data.dob.split("-")[0],
                username: data.data.username,
              }}
              validate={(values) => {
                const errors: SignupFormikError = {};
                if (!values.name) {
                  errors.name = "Trường bắt buộc.";
                }
                if (values.dobDate === DEFAULT_BOD_DATE) {
                  errors.dobDate = "Trường bắt buộc.";
                }
                if (values.dobMonth === DEFAULT_BOD_MONTH) {
                  errors.dobMonth = "Trường bắt buộc.";
                }
                if (values.dobYear === DEFAULT_BOD_YEAR) {
                  errors.dobYear = "Trường bắt buộc.";
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
                if (!values.username) {
                  errors.username = "Trường bắt buộc.";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await updateInfos({
                  name: values.name,
                  gender: values.gender,
                  dob: `${values.dobYear}-${values.dobMonth}-${values.dobDate}`,
                  email: values.email,
                  phone_number: values.phoneNumber,
                }).finally(() => {
                  setSubmitting(false);
                });
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
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
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
                  <div className="flex items-center space-x-4 mt-4">
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
                      <p className="text-sm">Giới tính:</p>
                      <div className="flex items-center space-x-10 grow">
                        <div className="flex items-center space-x-1">
                          <input
                            checked={values.gender === "MALE"}
                            onChange={handleChange}
                            value="MALE"
                            type="radio"
                            name="gender"
                          />
                          <span className="text-sm">Nam</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <input
                            checked={values.gender === "FEMALE"}
                            onChange={handleChange}
                            value="FEMALE"
                            type="radio"
                            name="gender"
                          />
                          <span className="text-sm">Nữ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm">Ngày sinh:</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="relative text-gray-500">
                        <select
                          name="dobDate"
                          onChange={handleChange}
                          value={values.dobDate}
                          className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                        >
                          <option>{DEFAULT_BOD_DATE}</option>
                          {DATE_ARRAY.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                        <AiOutlineDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-2"
                        />
                        <p className="text-xs text-red-500">
                          {errors.dobDate && touched.dobDate && errors.dobDate}
                        </p>
                      </div>
                      <div className="relative text-gray-500">
                        <select
                          name="dobMonth"
                          onChange={handleChange}
                          value={values.dobMonth}
                          className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                        >
                          <option>{DEFAULT_BOD_MONTH}</option>
                          {MONTH_ARRAY.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                        <AiOutlineDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-2"
                        />
                        <p className="text-xs text-red-500">
                          {errors.dobMonth &&
                            touched.dobMonth &&
                            errors.dobMonth}
                        </p>
                      </div>
                      <div className="relative text-gray-500">
                        <select
                          name="dobYear"
                          onChange={handleChange}
                          value={values.dobYear}
                          className="appearance-none p-3 w-full border border-gray-300 rounded-lg bg-white h-12"
                        >
                          <option>{DEFAULT_BOD_YEAR}</option>
                          {YEAR_ARRAY.map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                        <AiOutlineDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-2"
                        />
                        <p className="text-xs text-red-500">
                          {errors.dobYear && touched.dobYear && errors.dobYear}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <p className="text-sm">Username:</p>
                    <span className="text-sm text-gray-500">lamtran</span>
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
                  {updateLoading ? null : isUpdateSuccess ? (
                    <p className="text-xs text-center text-[#28a745] font-semibold">
                      Cập nhật thông tin cá nhân thành công
                    </p>
                  ) : isUpdateError ? (
                    <p className="text-xs text-center text-[#dc3545] font-semibold">
                      Đã có lỗi xảy ra, chưa cập nhật được thông tin cá nhân
                    </p>
                  ) : null}
                </form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="animate-pulse w-full bg-gray-300 h-full" />
        )}
      </div>
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
