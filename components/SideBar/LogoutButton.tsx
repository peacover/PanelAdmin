"use client";

import { Logout } from "@/server-actions/Logout";
import { useRouter } from "next/navigation";

const LogoutButton = ({...props}) => {
  const { push } = useRouter();
  const handleLogout = async () => {
    try {
      await Logout();
      push("/auth/signIn");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
    type="button"
    onClick={handleLogout}
    className="inline-flex items-center justify-center w-[10rem] rounded-md text-sm h-10 px-4 py-2 text-white font-bold"
    {...props}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
