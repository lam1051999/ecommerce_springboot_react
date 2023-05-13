import { Link } from "react-router-dom";
import PageContainer from "./PageContainer";
import { TbFaceIdError } from "react-icons/tb";
import { ReactNode } from "react";

type NotFoundIdProps = {
  title: ReactNode;
  to: string;
  buttonText: string;
};

export default function NotFoundId({ title, buttonText, to }: NotFoundIdProps) {
  return (
    <PageContainer>
      <div className="flex items-center justify-center text-gray-400 mt-4">
        <TbFaceIdError size={100} />
      </div>
      <div className="text-center w-full">
        <div>{title}</div>
        <Link to={to}>
          <button className="rounded-lg px-10 py-3 text-white text-sm font-semibold bg-blue-700 hover:bg-blue-500">
            {buttonText}
          </button>
        </Link>
      </div>
    </PageContainer>
  );
}
