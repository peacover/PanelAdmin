"use client";

import { useFormStatus } from "react-dom";

const DeleteButton = ({ title, ...props }: { title: string}) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md transition duration-300"
      disabled={pending}
      {...props}
    >
      {pending ? "Deleting..." : title}
    </button>
  );
};
export default DeleteButton;
