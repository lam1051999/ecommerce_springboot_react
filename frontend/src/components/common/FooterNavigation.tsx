import { Link } from "react-router-dom";
import { FooterNavigationItem } from "./types";

type FooterNavigationProps = {
  sections: FooterNavigationItem[];
};

export default function FooterNavigation({ sections }: FooterNavigationProps) {
  return (
    <ul>
      {sections.map((section, index) => (
        <li key={index} className="mt-2">
          <Link
            className="text-slate-400 hover:underline text-sm"
            to={section.to}
          >
            {section.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
