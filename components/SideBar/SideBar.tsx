"use client";

import { Logout } from "@/server-actions/Logout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SideBar = async () => {
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
    <div className="border-4 border-blue-500 w-1/5 h-screen flex flex-col justify-center items-center">
      <h1>SideBar</h1>
      <Link href="/dashboard">
        Dashboard
      </Link>
      <Link href="/dashboard/businessManagement">
        Business Management
      </Link>
      <Link href="/dashboard/adminManagement">
        Admin Management
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 w-full bg-blue-500 text-white"
      >
        Logout
      </button>
    </div>
  );
};
export default SideBar;
