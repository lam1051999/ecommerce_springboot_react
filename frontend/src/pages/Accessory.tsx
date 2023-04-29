import { accessoryBanners } from "../constants/banners";
import { accessoryChoices } from "../constants/choices";
import { accessoryDescription } from "../constants/description";
import ProductShowcase from "../components/common/ProductShowcase";

export default function Accessory() {
  return (
    <ProductShowcase
      productType="ACCESSORY"
      title="Phụ kiện"
      banners={accessoryBanners}
      choices={accessoryChoices}
      supportItems={null}
      allDesc={accessoryDescription}
    />
  );
}
