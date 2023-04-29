import { MAX_NUM_STARS_RATING } from "../../constants/config";

type RatingStarsDisplayProps = {
  size: number;
  overlayWidth: number;
};

export default function RatingStarsDisplay({
  size,
  overlayWidth,
}: RatingStarsDisplayProps) {
  return (
    <div className="flex items-center relative whitespace-nowrap">
      {Array.from(Array(MAX_NUM_STARS_RATING)).map((item, index) => (
        <svg
          fill="#FBB701"
          key={index}
          width={`${size}`}
          height={`${size}`}
          viewBox="0 0 940.688 940.688"
          className="mr-[1px]"
        >
          <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
        </svg>
      ))}
      <div
        className="bg-white h-full overflow-hidden mix-blend-color absolute top-0 right-0"
        style={{ width: `${overlayWidth}%` }}
      />
    </div>
  );
}
