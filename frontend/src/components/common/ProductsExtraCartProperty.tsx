type ProductsExtraCartPropertyProps = {
  title: string;
  value: string;
};

export default function ProductsExtraCartProperty({
  title,
  value,
}: ProductsExtraCartPropertyProps) {
  return (
    <p className="text-sm text-gray-600">
      {title}: {value}
    </p>
  );
}
