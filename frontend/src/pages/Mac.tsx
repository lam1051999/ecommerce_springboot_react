import ProductShowcase from "../components/common/ProductShowcase";
import { macBanners } from "../constants/banners";
import { macChoices } from "../constants/choices";
import { macSupport } from "../constants/support";
import { macDescription } from "../constants/description";
import { ProductType } from "../redux/types/types";

export default function Mac() {
  return (
    <ProductShowcase
      productType={ProductType.MAC}
      title="Mac"
      banners={macBanners}
      choices={macChoices}
      supportItems={macSupport}
      allDesc={macDescription}
    />
  );
}
