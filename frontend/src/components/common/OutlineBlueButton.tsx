import React from "react";

type OutlineBlueButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function OutlineBlueButton({
  children,
  onClick,
}: OutlineBlueButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      {children}
    </button>
  );
}
