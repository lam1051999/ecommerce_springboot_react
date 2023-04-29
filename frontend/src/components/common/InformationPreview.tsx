import { InformationCardInfo } from "./types";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import OutlineBlueButton from "./OutlineBlueButton";
import InformationGrid from "./InformationGrid";

type InformationPreviewProps = {
  informationCardInfos: InformationCardInfo[];
};
export default function InformationPreview({
  informationCardInfos,
}: InformationPreviewProps) {
  return (
    <div className="w-full my-20">
      <h1 className="mb-10 text-3xl font-bold leading-none text-center">
        Tin Tức
      </h1>
      <div className="mb-6 w-full h-full">
        <InformationGrid informationCardInfos={informationCardInfos} />
      </div>
      <div className="flex items-center justify-center w-full">
        <Link to="/information">
          <OutlineBlueButton>
            <span>Xem tất cả Tin Tức</span>
            <AiOutlineRight size={20} />
          </OutlineBlueButton>
        </Link>
      </div>
    </div>
  );
}
