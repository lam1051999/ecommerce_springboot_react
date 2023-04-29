import ProductShowcase from "../components/common/ProductShowcase";
import { watchBanners } from "../constants/banners";
import { watchChoices } from "../constants/choices";
import { watchSupport } from "../constants/support";
import { watchDescription } from "../constants/description";

export default function AppleWatch() {
  return (
    <ProductShowcase
      productType="WATCH"
      title="Watch"
      banners={watchBanners}
      choices={watchChoices}
      supportItems={watchSupport}
      allDesc={watchDescription}
    />
  );
}
