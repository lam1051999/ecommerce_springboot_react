import PageContainer from "../components/common/PageContainer";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

export default function SignupResult() {
  return (
    <PageContainer>
      <div className="py-32 text-center">
        <div className="w-[85px] h-[85px] mx-auto flex items-center justify-center text-white bg-[#339900] rounded-full">
          <TiTick size={70} />
        </div>
        <p className="font-semibold text-[#339900] text-lg mt-8 leading-none">
          Tài khoản của bạn đã được đăng ký thành công
        </p>
        <p className="text-sm my-4 text-gray-600">
          Chúc bạn tìm được sản phẩm ưng ý tại ShopDunk
        </p>
        <Link to="/">
          <button className="rounded-lg px-16 py-3 text-sm text-white font-semibold bg-blue-700 hover:bg-blue-500">
            Tiếp tục mua hàng
          </button>
        </Link>
      </div>
    </PageContainer>
  );
}
