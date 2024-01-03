"use client";

import deleteMe from "@/server-actions/deleteMe";
import { useRouter } from "next/navigation";

const DelMeButton = async () => {
  const router = useRouter();

  const handleDelMyAcc = async () => {
    try {
      await deleteMe();
      router.push("/auth/signIn");
    } catch (err) {
      console.error(err);
      return;
    }
  };
  return (
    <button
      onClick={handleDelMyAcc}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete My Account
    </button>
  );
};

export default DelMeButton;
