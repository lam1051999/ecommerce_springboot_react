import { iphoneBanners } from "../constants/banners";
import { iphoneChoices } from "../constants/choices";
import { iphoneSupport } from "../constants/support";
import { iphoneDescription } from "../constants/description";
import ProductShowcase from "../components/common/ProductShowcase";

export default function IPhone() {
  return (
    <ProductShowcase
      productType="IPHONE"
      title="iPhone"
      banners={iphoneBanners}
      choices={iphoneChoices}
      supportItems={iphoneSupport}
      allDesc={iphoneDescription}
    />
  );
}
