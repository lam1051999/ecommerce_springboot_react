import ProductShowcase from "../components/common/ProductShowcase";
import { ipadBanners } from "../constants/banners";
import { ipadChoices } from "../constants/choices";
import { iPadSupport } from "../constants/support";
import { ipadDescription } from "../constants/description";
import { ProductType } from "../redux/types/types";

export default function IPad() {
  return (
    <ProductShowcase
      productType={ProductType.IPAD}
      title="iPad"
      banners={ipadBanners}
      choices={ipadChoices}
      supportItems={iPadSupport}
      allDesc={ipadDescription}
    />
  );
}
