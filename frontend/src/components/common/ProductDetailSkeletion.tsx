import { NUM_SLIDE_IMAGES_SKELETON } from "../../constants/config";

export default function ProductDetailSkeletion() {
  return (
    <div className="animate-pulse w-full">
      <div className="flex justify-between w-full" style={{ height: "65vh" }}>
        <div className="h-full flex flex-col" style={{ width: "48.5%" }}>
          <div className="bg-gray-300 mb-2 grow rounded-md" />
          <div className="flex items-center justify-between h-24 w-full">
            {Array.from(Array(NUM_SLIDE_IMAGES_SKELETON)).map((item, index) => (
              <div
                key={index}
                className="bg-gray-300 h-full rounded-md w-[19%]"
              />
            ))}
          </div>
        </div>
        <div className="h-full bg-gray-300" style={{ width: "48.5%" }} />
      </div>
      <div className="bg-gray-300 my-6 h-[50vh]" />
    </div>
  );
}
