import { InformationCardInfo } from "./types";
import { Link } from "react-router-dom";

type InformationCardProps = {
  informationCardInfo: InformationCardInfo;
};

export default function InformationCard({
  informationCardInfo,
}: InformationCardProps) {
  return (
    <Link to="#">
      <div className="overflow-hidden w-full bg-white rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_20px_rgba(0,0,0,0.3)]">
        <div className="w-full" style={{ height: "25vh" }}>
          <img
            src={informationCardInfo.displayImage}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-6 py-10">
          <h2 className="mb-10 text-xl font-semibold leading-none">
            {informationCardInfo.title}
          </h2>
          <p className="text-sm text-gray-500">{informationCardInfo.date}</p>
        </div>
      </div>
    </Link>
  );
}
