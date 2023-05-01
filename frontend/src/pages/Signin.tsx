import { Link, useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../components/common/PageContainer";
import signinBanner from "/images/authentication/signinBanner.jpeg";
import { Formik } from "formik";
import { AiOutlineLoading } from "react-icons/ai";
import { useAuthenticateMutation } from "../redux/api/authenticationApi";
import { useAppDispatch } from "../redux/hooks/hooks";
import { onRenewToken } from "../redux/slices/authenticationSlice";
import { useGetCustomerInfosQuery } from "../redux/api/userApi";
import { useEffect } from "react";

type SigninFormikError = {
  username?: string;
  password?: string;
};

export default function Signin() {
  const [authenticate, { isError, isSuccess, error, data }] =
    useAuthenticateMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useAppDispatch();
  const {
    data: customerInfos,
    error: customerInfosError,
    isLoading,
  } = useGetCustomerInfosQuery();

  function redirectFromLogin() {
    searchParams.get("returnUrl")
      ? navigate(`/${searchParams.get("returnUrl")}`)
      : navigate("/");
  }

  useEffect(() => {
    if (customerInfos) {
      redirectFromLogin();
    }
  }, [customerInfos]);

  return (
    <PageContainer>
      <div className="flex justify-stretch">
        <div className="w-[60%] h-full flex items-center justify-center py-[70px]">
          <img src={signinBanner} className="w-[620px] object-cover" />
        </div>
        <div className="w-[40%] h-full py-[40px]">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors: SigninFormikError = {};
              if (!values.username) {
                errors.username = "Trường bắt buộc.";
              }
              if (!values.password) {
                errors.password = "Trường bắt buộc.";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await authenticate({
                username: values.username,
                password: values.password,
              })
                .unwrap()
                .then((fulfilled) => {
                  dispatch(onRenewToken(fulfilled));
                  redirectFromLogin();
                });
              setSubmitting(false);
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
                  Đăng nhập
                </h1>
                {isError ? (
                  error ? (
                    error.status === 403 || error.status === 401 ? (
                      <p className="text-xs text-red-500">
                        Thông tin đăng nhập không đúng. Vui lòng thử lại. Đăng
                        nhập không thành công
                      </p>
                    ) : (
                      <p className="text-xs text-red-500">Đã có lỗi xảy ra</p>
                    )
                  ) : null
                ) : null}
                <div>
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
                <div className="my-4">
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <p className="text-sm text-gray-500">Nhớ mật khẩu</p>
                  </div>
                  <Link className="text-sm text-blue-700" to="#">
                    Quên mật khẩu?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`my-4 rounded-lg w-full py-3 text-white h-[50px] flex items-center justify-center ${
                    isSubmitting
                      ? "bg-blue-500"
                      : "bg-blue-700 hover:bg-blue-500"
                  }`}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading className="animate-spin" size={25} />
                  ) : (
                    <span>Đăng nhập</span>
                  )}
                </button>
                <p className="text-[15px]">
                  Bạn Chưa Có Tài Khoản?&nbsp;
                  <Link className="text-blue-700" to="/sign-up">
                    Tạo Tài Khoản Ngay
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
