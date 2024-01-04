"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, ...props }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-6 bg-black text-white px-4 py-2 rounded-md transition duration-300"
      disabled={pending}
      {...props}
    >
      {pending ? "Adding..." : title}
    </button>
  );
};
export default SubmitButton;
