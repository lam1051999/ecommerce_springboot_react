import { AiOutlineLoading } from "react-icons/ai";

type SubmitButtonProps = {
  isSubmitting: boolean;
  text: string;
  width: string;
};

export default function SubmitButton({
  isSubmitting,
  text,
  width,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`my-4 rounded-lg text-sm text-white h-[40px] mx-auto flex items-center justify-center ${
        isSubmitting ? "bg-blue-500" : "bg-blue-700 hover:bg-blue-500"
      }`}
      style={{
        width: width,
      }}
    >
      {isSubmitting ? (
        <AiOutlineLoading className="animate-spin" size={25} />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}
