import notfoundImage from "/images/pages/notfound/notfound.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col items-center">
      <div style={{ height: "37vh" }}>
        <img src={notfoundImage} className="h-full object-cover" />
      </div>
      <div className="text-center my-8 w-full">
        <h1 className="font-semibold text-2xl">
          Oops! Trang bạn tìm kiếm không tồn tại.
        </h1>
        <p className="text-gray-800 my-2">
          Website Shopdunk mới nâng cấp, do đó có một số link có thể được thay
          đổi.
        </p>
        <p className="text-gray-800 my-2">
          Bạn vui lòng trở lại trang chủ, thử tìm kiếm với từ khóa khác hoặc
          tiếp tục mua sắm!
        </p>
        <Link to="/">
          <button className="rounded-lg px-36 py-3 text-white font-semibold bg-blue-700 hover:bg-blue-500">
            Trở về trang chủ
          </button>
        </Link>
      </div>
    </div>
  );
}
