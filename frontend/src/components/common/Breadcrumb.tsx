import { AiOutlineRight } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { ordinaryRoutes } from "../../constants/routes";
import { PathLink } from "../../constants/type";
import { useAppSelector } from "../../redux/hooks/hooks";
import PageContainer from "./PageContainer";
import { getMatchedRoute } from "../../utils/helper";

export default function Breadcrumb() {
  const location = useLocation();
  const { pathname } = location;
  const matchedOrdinaryRoute = getMatchedRoute(ordinaryRoutes, pathname);
  const isOrdinaryRoute = matchedOrdinaryRoute !== undefined;
  const isProductDetailRoute = pathname.startsWith("/products/");
  const isValidRoute = isOrdinaryRoute || isProductDetailRoute;
  let pathLinks: PathLink[] = [];
  const tempPathLinks = useAppSelector((state) => state.breadcrumb.listPath);

  if (pathname === "/" || !isValidRoute) return null;
  if (isOrdinaryRoute) {
    pathLinks = matchedOrdinaryRoute.listPath;
  }
  if (isProductDetailRoute) {
    pathLinks = tempPathLinks;
  }

  return (
    <div className="w-full bg-white py-4">
      <PageContainer>
        <nav className="flex" aria-label="Breadcrumb">
          <ul className="flex items-center space-x-1 md:space-x-3">
            <li className="flex items-center">
              <Link
                to="/"
                className="flex items-center text-xs font-medium text-gray-700 hover:text-blue-700"
              >
                Trang chủ
              </Link>
            </li>
            {pathLinks.map((p, index) => (
              <li key={index}>
                <div className="flex items-center">
                  <AiOutlineRight size={10} />
                  <Link
                    to={p.goTo ? p.goTo : "#"}
                    className={`ml-1 text-xs font-medium text-gray-700 ml-2 ${
                      p.goTo ? "hover:text-blue-700" : "cursor-default"
                    }`}
                  >
                    {p.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </PageContainer>
    </div>
  );
}
