import imageLogo from "/images/logo.png";
import FooterNavigation from "./FooterNavigation";
import {
  contactItems,
  infoItems,
  serviceItems,
} from "../../constants/navigationItems";
import legitCheck from "/images/enterprise/legit.png";
import { SiZalo, SiTiktok, SiYoutube } from "react-icons/si";
import { GrFacebookOption } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#1D1D1F] py-20 w-full">
      <div className="w-8/12 md:w-10/12 divide-y divide-slate-400 mx-auto">
        <div className="flex justify-between w-full mb-10">
          <div className="pr-10" style={{ width: "30%" }}>
            <img src={imageLogo} className="w-3/5 object-cover mb-5" />
            <p className="text-sm text-white text-justify">
              Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi
              phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang
              đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho
              người dùng Việt Nam.
            </p>
            <div className="flex items-center space-x-2 my-5">
              <Link to="#">
                <div className="w-[50px] h-[50px] border rounded-full border-2 border-[#515154] flex items-center justify-center">
                  <GrFacebookOption color="#129AF6" size={20} />
                </div>
              </Link>
              <Link to="#">
                <div className="w-[50px] h-[50px] border rounded-full border-2 border-[#515154] flex items-center justify-center">
                  <SiTiktok color="#F7F7F7" size={20} />
                </div>
              </Link>
              <Link to="#">
                <div className="w-[50px] h-[50px] border rounded-full border-2 border-[#515154] flex items-center justify-center">
                  <SiZalo color="#0164F7" size={30} />
                </div>
              </Link>
              <Link to="#">
                <div className="w-[50px] h-[50px] border rounded-full border-2 border-[#515154] flex items-center justify-center">
                  <SiYoutube color="#FF0000" size={25} />
                </div>
              </Link>
            </div>
          </div>
          <div style={{ width: "23%" }}>
            <p className="text-white mb-6">Thông tin</p>
            <FooterNavigation sections={infoItems} />
          </div>
          <div style={{ width: "23%" }}>
            <p className="text-white mb-6">Chính sách</p>
            <FooterNavigation sections={serviceItems} />
          </div>
          <div style={{ width: "23%" }}>
            <p className="text-white mb-6">Địa chỉ & Liên hệ</p>
            <FooterNavigation sections={contactItems} />
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 w-full">
          <div className="flex-1">
            <p className="text-slate-500 text-sm">
              © 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH
              & ĐT TP. Hà Nội cấp ngày 08/06/2016.
            </p>
            <p className="text-slate-500 text-sm">
              Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố
              Hà Nội, Việt Nam
            </p>
            <p className="text-slate-500 text-sm">
              Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email:
              lienhe@shopdunk.com
            </p>
          </div>
          <a
            className="w-1/6"
            href="http://online.gov.vn/(X(1)S(jfktnnku5rui3vjf5pnk4sgc))/Home/WebDetails/34144?AspxAutoDetectCookieSupport=1"
          >
            <img src={legitCheck} />
          </a>
        </div>
      </div>
    </div>
  );
}
