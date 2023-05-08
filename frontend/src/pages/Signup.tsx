import { Link, useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import signupBanner from "/images/authentication/signupBanner.jpeg";
import { AiOutlineDown } from "react-icons/ai";
import { Formik } from "formik";
import { AiOutlineLoading } from "react-icons/ai";
import { useRegisterMutation } from "../redux/api/authenticationApi";
import { CustomBaseQueryError } from "../redux/types/types";
import SubmitButton from "../components/common/SubmitButton";

export const DEFAULT_BOD_DATE = "Ngày";
export const DEFAULT_BOD_MONTH = "Tháng";
export const DEFAULT_BOD_YEAR = "Năm";
export const DEFAULT_GENDER = "MALE";
export const DATE_ARRAY = Array.from(Array(31)).map((item, index) =>
  `${index + 1}`.length < 2 ? `0${index + 1}` : `${index + 1}`
);
export const MONTH_ARRAY = Array.from(Array(12)).map((item, index) =>
  `${index + 1}`.length < 2 ? `0${index + 1}` : `${index + 1}`
);
export const NUM_YEARS = 110;
export const YEAR_ARRAY = Array.from(Array(NUM_YEARS)).map(
  (item, index) => `${new Date().getFullYear() - NUM_YEARS + index + 1}`
);

export type SignupFormikError = {
  name?: string;
  dobDate?: string;
  dobMonth?: string;
  dobYear?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  password?: string;
  repeatPassword?: string;
};

export default function Signup() {
  const [register, { isError, isSuccess, error, data }] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className="flex">
        <div className="w-[60%] h-full flex items-center justify-center py-[70px]">
          <img src={signupBanner} className="w-[660px] object-cover" />
        </div>
        <div className="w-[40%] h-full py-[40px]">
          <Formik
            initialValues={{
              name: "",
              gender: DEFAULT_GENDER,
              dobDate: DEFAULT_BOD_DATE,
              dobMonth: DEFAULT_BOD_MONTH,
              dobYear: DEFAULT_BOD_YEAR,
              email: "",
              phoneNumber: "",
              username: "",
              password: "",
              repeatPassword: "",
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
              } else if (
                !/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(
                  values.phoneNumber
                )
              ) {
                errors.phoneNumber = "Số điện thoại không hợp lệ.";
              }
              if (!values.username) {
                errors.username = "Trường bắt buộc.";
              }
              if (!values.password) {
                errors.password = "Trường bắt buộc.";
              } else if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
                  values.password
                )
              ) {
                errors.password = "Mật khẩu chưa đúng format";
              }
              if (!values.repeatPassword) {
                errors.repeatPassword = "Trường bắt buộc.";
              } else if (values.repeatPassword !== values.password) {
                errors.repeatPassword =
                  "Mật khẩu và mật khẩu xác nhận không khớp.";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await register({
                name: values.name,
                gender: values.gender,
                dob: `${values.dobYear}-${values.dobMonth}-${values.dobDate}`,
                email: values.email,
                phone_number: values.phoneNumber,
                username: values.username,
                password: values.password,
              })
                .unwrap()
                .then(() => {
                  resetForm();
                  navigate("/sign-up-result");
                })
                .finally(() => {
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
                <h1 className="font-bold text-4xl tracking-tight py-[30px]">
                  Đăng ký
                </h1>
                {isError ? (
                  error ? (
                    (error as CustomBaseQueryError).status === 409 ? (
                      <p className="text-xs text-red-500">
                        Đăng ký không thành công, username đã tồn tại
                      </p>
                    ) : (
                      <p className="text-xs text-red-500">Đã có lỗi xảy ra</p>
                    )
                  ) : null
                ) : null}
                <div>
                  <p className="text-sm">Tên, Họ:</p>
                  <input
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="name"
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>
                <div className="flex items-center space-x-10 mt-4">
                  <p className="text-sm">Giới tính:</p>
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
                <div className="mt-4">
                  <p className="text-sm">Ngày sinh:</p>
                  <div className="grid grid-cols-3 gap-3">
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
                        {errors.dobMonth && touched.dobMonth && errors.dobMonth}
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
                <div className="mt-4">
                  <p className="text-sm">E-mail:</p>
                  <input
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    value={values.email}
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm">Điện thoại:</p>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm">Username:</p>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="username"
                    value={values.username}
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.username && touched.username && errors.username}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-sm">Mật khẩu:</p>
                  <input
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    value={values.password}
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <p className="text-xs bg-gray-200 p-3 rounded-lg mt-2">
                  Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ in hoa,
                  chữ in thường, số và các ký tự đặc biệt
                </p>
                <div className="mt-4">
                  <p className="text-sm">Xác nhận mật khẩu:</p>
                  <input
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="repeatPassword"
                    value={values.repeatPassword}
                    className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-red-500">
                    {errors.repeatPassword &&
                      touched.repeatPassword &&
                      errors.repeatPassword}
                  </p>
                </div>
                <SubmitButton
                  isSubmitting={isSubmitting}
                  text="Đăng ký"
                  width="100%"
                />
                <p className="text-[15px]">
                  Bạn Đã Có Tài Khoản?&nbsp;
                  <Link className="text-blue-700" to="/sign-in">
                    Đăng Nhập Ngay
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </PageContainer>
  );
}
