"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import deleteMe from "@/server-actions/deleteMe";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DelMeButton = async () => {
  const router = useRouter();

  const handleDelMyAcc = async () => {
    try {
      await deleteMe();
      toast.success("User deleted");
      router.push("/auth/signIn");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting user");
      return;
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete My Account
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete your account!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelMyAcc} autoFocus>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DelMeButton;
