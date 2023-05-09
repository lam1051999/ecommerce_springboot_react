import { Link, useNavigate } from "react-router-dom";
import imageLogo from "/images/logo.png";
import { BsSearch, BsCart } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { FaUserCircle } from "react-icons/fa";
import { getFullPathImage, parseJwt } from "../../utils/helper";
import { onResetToken } from "../../redux/slices/authenticationSlice";
import { useGetCustomerAvatarQuery } from "../../redux/api/userApi";
import { useEffect } from "react";

export default function Header() {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const token = useAppSelector((state) => state.authentication.token);
  const {
    data: getAvatarData,
    error: getAvatarError,
    isLoading: getAvatarIsLoading,
    refetch: getAvatarRefetch,
  } = useGetCustomerAvatarQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAvatarRefetch();
  }, [token]);

  return (
    <nav className="sticky top-0 z-30 bg-[#515154] flex items-center justify-center h-16">
      <Link to="/" className="hover:cursor-pointer">
        <img src={imageLogo} className="h-12 mr-10" alt="Shopdunk Logo" />
      </Link>
      <ul className="flex h-full">
        <li className="h-full">
          <Link
            to="/iphone"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">iPhone</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/ipad"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">iPad</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/mac"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Mac</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/apple-watch"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Watch</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/sound"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Âm thanh</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/accessory"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Phụ kiện</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/service"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Dịch vụ</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/information"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Tin tức</span>
          </Link>
        </li>
        <li className="h-full">
          <Link
            to="/promotion"
            className="hover:cursor-pointer flex items-center justify-center w-24 h-full hover:bg-gray-500"
          >
            <span className="text-sm text-white">Khuyến mại</span>
          </Link>
        </li>
      </ul>
      <div
        className="text-white flex items-center justify-evenly"
        style={{ width: "12%" }}
      >
        <div className="cursor-pointer p-2 rounded-full hover:bg-gray-500">
          <BsSearch size={22} />
        </div>
        <Link to="/shopping-cart">
          <div className="relative p-2 rounded-full hover:bg-gray-500">
            <BsCart size={22} />
            <div className="absolute bottom-0 right-0 rounded-full bg-white w-[18px] h-[18px] flex items-center justify-center">
              <span className="text-black text-[10px]">
                {cartItems.reduce((total, item) => {
                  return item.quantity + total;
                }, 0)}
              </span>
            </div>
          </div>
        </Link>
        <div className="group relative h-auto">
          <Link to="/customer-infos/account">
            <div className="p-2 rounded-full hover:bg-gray-500 cursor-pointer">
              <AiOutlineUser size={22} />
            </div>
          </Link>
          <div className="text-black absolute hidden top-9 -right-4 w-[270px] group-hover:block bg-white rounded-lg shadow-[2px_2px_10px_rgba(0,0,0,0.08)]">
            {token ? (
              <div className="w-full">
                <div className="flex items-center w-full space-x-3 px-4 pt-4">
                  <Link to="/customer-infos/account">
                    {getAvatarError || getAvatarIsLoading ? (
                      <FaUserCircle color="#DDDDDD" size={40} />
                    ) : getAvatarData ? (
                      getAvatarData.data.avatar ? (
                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden mb-3">
                          <img
                            src={getFullPathImage(getAvatarData.data.avatar)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <FaUserCircle color="#DDDDDD" size={40} />
                      )
                    ) : (
                      <FaUserCircle color="#DDDDDD" size={40} />
                    )}
                  </Link>
                  <p className="text-sm font-bold">{parseJwt(token).sub}</p>
                </div>
                <ul className="grid grid-cols-1 divide-y px-4 py-2">
                  <li className="py-2 text-sm">
                    <Link
                      to="/customer-infos/account"
                      className="hover:text-blue-700"
                    >
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li className="py-2 text-sm">
                    <button
                      onClick={() => {
                        dispatch(onResetToken());
                        navigate("/");
                      }}
                      className="hover:text-blue-700"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <ul className="grid grid-cols-1 divide-y px-4 py-2">
                <li className="py-2 text-sm">
                  <Link to="/sign-up" className="hover:text-blue-700">
                    Tạo tài khoản ngay
                  </Link>
                </li>
                <li className="py-2 text-sm">
                  <Link to="/sign-in" className="hover:text-blue-700">
                    Đăng nhập
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
