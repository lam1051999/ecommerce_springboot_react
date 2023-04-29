import ProductShowcase from "../components/common/ProductShowcase";
import { soundBanners } from "../constants/banners";
import { soundChoices } from "../constants/choices";
import { soundDescription } from "../constants/description";

export default function Sound() {
  return (
    <ProductShowcase
      productType="SOUND"
      title="Âm thanh"
      banners={soundBanners}
      choices={soundChoices}
      supportItems={null}
      allDesc={soundDescription}
    />
  );
}
