import { iphoneBanners } from "../constants/banners";
import { iphoneChoices } from "../constants/choices";
import { iphoneSupport } from "../constants/support";
import { iphoneDescription } from "../constants/description";
import ProductShowcase from "../components/common/ProductShowcase";
import { ProductType } from "../redux/types/types";

export default function IPhone() {
  return (
    <ProductShowcase
      productType={ProductType.IPHONE}
      title="iPhone"
      banners={iphoneBanners}
      choices={iphoneChoices}
      supportItems={iphoneSupport}
      allDesc={iphoneDescription}
    />
  );
}
