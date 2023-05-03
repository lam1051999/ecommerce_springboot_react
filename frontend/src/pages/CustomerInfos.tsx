import { useState } from "react";
import PageContainer from "../components/common/PageContainer";
import { profileTabs } from "../constants/profileTabs";

export default function CustomerInfos() {
  const [choosenTab, setChoosenTab] = useState(profileTabs[0].key);

  return (
    <PageContainer>
      <div className="w-full mt-4 flex justify-between mb-20">
        <div className="w-[30%] relative">
          <ul className="w-full p-3 bg-white rounded-lg sticky top-[5rem]">
            {profileTabs.map((item) => (
              <li key={item.key} className="w-full">
                <button
                  onClick={() => setChoosenTab(item.key)}
                  className={`flex items-center space-x-2 w-full py-3 px-4 rounded-lg ${
                    choosenTab === item.key
                      ? "bg-[#E7EFFA] text-blue-700"
                      : "text-black"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[60%]">
          <div className="bg-white rounded-lg">
            {profileTabs.find((item) => item.key === choosenTab)?.component}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
