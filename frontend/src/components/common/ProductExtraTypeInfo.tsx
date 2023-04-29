type ProductExtraTypeInfoProps = {
  title: string;
  value: string;
};

export default function ProductExtraTypeInfo({
  title,
  value,
}: ProductExtraTypeInfoProps) {
  return (
    <div className="w-full my-6">
      <p className="mb-2 text-sm">{title}</p>
      <div className="w-full flex items-center">
        <p className="px-7 py-2 rounded text-sm text-gray-500 border border-blue-700 text-center cursor-pointer select-none">
          {value}
        </p>
      </div>
    </div>
  );
}
