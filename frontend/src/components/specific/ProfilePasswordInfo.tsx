import { Formik } from "formik";
import CustomerInfosContainer from "./CustomerInfosContainer";
import { AiOutlineLoading } from "react-icons/ai";
import { useUpdateCustomerPasswordMutation } from "../../redux/api/userApi";
import { CustomBaseQueryError } from "../../redux/types/types";

type ProfilePasswordInfoFormikError = {
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
};

export default function ProfilePasswordInfo() {
  const [
    updatePassword,
    {
      isError: updatePasswordIsError,
      isSuccess: updatePasswordIsSuccess,
      isLoading: updatePasswordIsLoading,
      data: updatePasswordData,
      error: updatePasswordError,
    },
  ] = useUpdateCustomerPasswordMutation();

  const mainContent = (
    <div className="bg-white rounded-lg p-4">
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        }}
        validate={(values) => {
          const errors: ProfilePasswordInfoFormikError = {};
          if (!values.oldPassword) {
            errors.oldPassword = "Trường bắt buộc.";
          }
          if (!values.newPassword) {
            errors.newPassword = "Trường bắt buộc.";
          } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i.test(
              values.newPassword
            )
          ) {
            errors.newPassword = "Mật khẩu chưa đúng format";
          }
          if (!values.repeatNewPassword) {
            errors.repeatNewPassword = "Trường bắt buộc.";
          } else if (values.repeatNewPassword !== values.newPassword) {
            errors.repeatNewPassword =
              "Mật khẩu và mật khẩu xác nhận không khớp.";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await updatePassword({
            old_password: values.oldPassword,
            new_password: values.newPassword,
          })
            .unwrap()
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
            <p className="text-xs bg-gray-200 p-3 rounded-lg mt-2">
              Lưu ý: Mật khẩu phải có tối thiểu 8 ký tự bao gồm chữ in hoa, chữ
              in thường, số và các ký tự đặc biệt
            </p>
            <div className="mt-4">
              <p className="text-sm">Mật khẩu cũ:</p>
              <input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="oldPassword"
                value={values.oldPassword}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-red-500">
                {errors.oldPassword &&
                  touched.oldPassword &&
                  errors.oldPassword}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm">Mật khẩu mới:</p>
              <input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="newPassword"
                value={values.newPassword}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-red-500">
                {errors.newPassword &&
                  touched.newPassword &&
                  errors.newPassword}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-sm">Xác nhận mật khẩu:</p>
              <input
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="repeatNewPassword"
                value={values.repeatNewPassword}
                className="w-full p-3 text-gray-900 border border-gray-300 rounded-lg"
              />
              <p className="text-xs text-red-500">
                {errors.repeatNewPassword &&
                  touched.repeatNewPassword &&
                  errors.repeatNewPassword}
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`my-4 rounded-lg w-40 mx-auto text-sm text-white h-[40px] flex items-center justify-center ${
                isSubmitting ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-500"
              }`}
            >
              {isSubmitting ? (
                <AiOutlineLoading className="animate-spin" size={25} />
              ) : (
                <span>Đổi mật khẩu</span>
              )}
            </button>
            {updatePasswordIsLoading ? null : updatePasswordIsSuccess ? (
              <p className="text-xs text-center text-[#28a745] font-semibold">
                Cập nhật mật khẩu thành công
              </p>
            ) : updatePasswordIsError ? (
              (updatePasswordError as CustomBaseQueryError).status === 400 ? (
                <p className="text-xs text-center text-[#dc3545] font-semibold">
                  Mật khẩu cũ chưa đúng
                </p>
              ) : (
                <p className="text-xs text-center text-[#dc3545] font-semibold">
                  Đã có lỗi xảy ra, chưa cập nhật được mật khẩu
                </p>
              )
            ) : null}
          </form>
        )}
      </Formik>
    </div>
  );

  return <CustomerInfosContainer mainContent={mainContent} />;
}
