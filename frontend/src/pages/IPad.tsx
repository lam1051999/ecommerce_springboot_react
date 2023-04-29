import ProductShowcase from "../components/common/ProductShowcase";
import { ipadBanners } from "../constants/banners";
import { ipadChoices } from "../constants/choices";
import { iPadSupport } from "../constants/support";
import { ipadDescription } from "../constants/description";

export default function IPad() {
  return (
    <ProductShowcase
      productType="IPAD"
      title="iPad"
      banners={ipadBanners}
      choices={ipadChoices}
      supportItems={iPadSupport}
      allDesc={ipadDescription}
    />
  );
}
