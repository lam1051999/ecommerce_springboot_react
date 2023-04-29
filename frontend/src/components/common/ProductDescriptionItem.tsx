import { ProductDescriptionItem } from "./types";

export default function IphoneDescriptionItem({
  title,
  desc,
}: ProductDescriptionItem) {
  return (
    <div>
      <h2 className="font-bold text-2xl">{title}</h2>
      {desc.map((item, index) => (
        <p key={index} className="text-sm my-3">
          {item}
        </p>
      ))}
    </div>
  );
}
