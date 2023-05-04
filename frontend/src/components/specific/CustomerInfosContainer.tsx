import { ReactNode } from "react";
import { profileTabs } from "../../constants/profileTabs";
import PageContainer from "../common/PageContainer";
import { Link, useLocation } from "react-router-dom";

type CustomerInfosContainerProps = {
  mainContent: ReactNode;
};

export default function CustomerInfosContainer({
  mainContent,
}: CustomerInfosContainerProps) {
  const location = useLocation();

  return (
    <PageContainer>
      <div className="w-full mt-4 flex justify-between mb-20">
        <div className="w-[30%] relative">
          <ul className="w-full p-3 bg-white rounded-lg sticky top-[5rem]">
            {profileTabs.map((item) => (
              <li key={item.to} className="w-full">
                <Link to={item.to}>
                  <button
                    className={`flex items-center space-x-2 w-full py-3 px-4 rounded-lg ${
                      location.pathname === item.to
                        ? "bg-[#E7EFFA] text-blue-700"
                        : "text-black"
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[60%]">
          <div className="bg-white rounded-lg">{mainContent}</div>
        </div>
      </div>
    </PageContainer>
  );
}
