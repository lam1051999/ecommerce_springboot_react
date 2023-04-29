export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse cursor-pointer w-full bg-white p-6 rounded-xl shadow-[2px_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[2px_2px_20px_rgba(0,0,0,0.3)]">
      <div className="h-72 mb-6 bg-gray-300 rounded" />
      <div className="h-4 mb-6 bg-gray-300 rounded"></div>
      <div className="flex items-center">
        <div
          className="h-4 bg-gray-300 rounded mr-4"
          style={{ width: "35%" }}
        ></div>
        <div className="h-4 bg-gray-300 rounded" style={{ width: "35%" }}></div>
      </div>
    </div>
  );
}
