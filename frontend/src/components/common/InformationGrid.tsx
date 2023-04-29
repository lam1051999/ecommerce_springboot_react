import { InformationCardInfo } from "./types";
import InformationCard from "./InformationCard";

type InformationGridProps = {
  informationCardInfos: InformationCardInfo[];
};

export default function InformationGrid({
  informationCardInfos,
}: InformationGridProps) {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-6">
      {informationCardInfos.map((informationCardInfo, index) => (
        <InformationCard
          informationCardInfo={informationCardInfo}
          key={index}
        />
      ))}
    </div>
  );
}
