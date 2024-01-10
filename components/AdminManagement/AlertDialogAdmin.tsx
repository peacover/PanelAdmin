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
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteUser from "@/server-actions/deleteUser";

export function AlertDialogAdmin({ userId }: { userId: string }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleDelUser = async () => {
    console.log("handleDelUser");
    console.log(userId);
    try {
      await deleteUser(userId);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Error deleting user");
    }
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default">Delete </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the user from the
              system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelUser} autoFocus>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && <p>{error}</p>}
    </>
  );
}
