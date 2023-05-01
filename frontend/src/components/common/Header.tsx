import { Link } from "react-router-dom";
import imageLogo from "/images/logo.png";
import { BsSearch, BsCart } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks/hooks";
import { useEffect } from "react";
import { SHOPDUNK_BACKEND_BASE_URL } from "../../constants/config";
import axios from "axios";

export default function Header() {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const token = useAppSelector((state) => state.authentication.token);

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
        <Link
          to={token ? "/customer-infos" : "/sign-in"}
          className="p-2 rounded-full hover:bg-gray-500"
        >
          <AiOutlineUser size={22} />
        </Link>
      </div>
    </nav>
  );
}
