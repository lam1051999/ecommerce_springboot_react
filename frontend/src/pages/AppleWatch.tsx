import ProductShowcase from "../components/common/ProductShowcase";
import { watchBanners } from "../constants/banners";
import { watchChoices } from "../constants/choices";
import { watchSupport } from "../constants/support";
import { watchDescription } from "../constants/description";
import { ProductType } from "../redux/types/types";

export default function AppleWatch() {
  return (
    <ProductShowcase
      productType={ProductType.WATCH}
      title="Watch"
      banners={watchBanners}
      choices={watchChoices}
      supportItems={watchSupport}
      allDesc={watchDescription}
    />
  );
}
