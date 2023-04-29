import { showcases } from "../../constants/showcases";
import { Link } from "react-router-dom";

export default function Showcase() {
  return (
    <div className="flex w-full space-x-4 my-10">
      {showcases.map((item, index) => (
        <Link key={index} to={item.to}>
          <img src={item.src} />
        </Link>
      ))}
    </div>
  );
}
