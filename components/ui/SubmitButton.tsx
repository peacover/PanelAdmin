"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, ...props }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      disabled={pending}
      {...props}
    >
      {pending ? "Loading..." : title}
    </button>
  );
};
export default SubmitButton;
