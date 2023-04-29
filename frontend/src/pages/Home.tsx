import Showcase from "../components/specific/Showcase";
import ProductsPreview from "../components/common/ProductsPreview";
import { Link } from "react-router-dom";
import enterpriseImage from "/images/enterprise/enterprise.jpeg";
import InformationPreview from "../components/common/InformationPreview";
import Carousel from "../components/common/Carousel";
import { homeBanners } from "../constants/banners";
import { fakeInformationData } from "../constants/data";
import { mapTitleChoices } from "../constants/previewChoices";
import { getPreviewChoices } from "../utils/helper";
import PageContainer from "../components/common/PageContainer";

export default function Home() {
  const previewChoices = getPreviewChoices(mapTitleChoices);

  return (
    <>
      <Carousel banners={homeBanners} height={60} />
      <PageContainer>
        <Showcase />
        <div className="w-full mt-20">
          {previewChoices.map((item, index) => (
            <ProductsPreview key={index} mapTitlePreviewChoice={item} />
          ))}
        </div>
        <div className="my-20">
          <Link to="#">
            <img src={enterpriseImage} className="w-full h-full object-cover" />
          </Link>
        </div>
        <InformationPreview informationCardInfos={fakeInformationData} />
      </PageContainer>
    </>
  );
}
