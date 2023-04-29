export default function Newsletter() {
  return (
    <div className="bg-gray-100 flex items-center justify-center py-20">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold leading-none text-center">
          Đăng ký nhận tin từ ShopDunk
        </h1>
        <p className="text-base text-gray-600 leading-none text-center py-6">
          Thông tin sản phẩm mới nhất và chương trình khuyến mãi
        </p>
        <div className="relative">
          <input
            className="w-full p-3 pl-10 pr-40 text-base text-gray-900 border border-gray-300 rounded-full bg-white"
            placeholder="Email của bạn"
          />
          <button className="text-white absolute h-full w-32 right-0 bg-blue-700 hover:bg-blue-500 font-medium rounded-full text-sm p-4">
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
}
