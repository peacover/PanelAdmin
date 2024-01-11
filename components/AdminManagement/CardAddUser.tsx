"use client";

import { TState } from "@/lib/types/TFormState";
import { AddUserSchema } from "@/lib/validations/addUser.schema";
import addUser from "@/server-actions/addUser";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "../ui/SubmitButton";
import { AlertDialogAdmin } from "./AlertDialogAdmin";
import { toast } from "sonner";

const handleAddUser = async (prevState: TState, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const role = formData.get("role");
  try {
    const user = AddUserSchema.safeParse({
      name,
      email,
      role,
    });

    if (!user.success) {
      user.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return {
        error: user.error.message,
        success: false,
      };
    }
    await addUser(user.data);
    // clear input fields
    formData.set("name", "");
    formData.set("email", "");
    formData.set("role", "");

    toast.success("User added successfully!");
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    toast.error((error as Error).message);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};

const CardAddUser = () => {
  const [addUserState, addUserAction] = useFormState(handleAddUser, {
    error: null,
    success: false,
  });
  const router = useRouter();
  const { pending } = useFormStatus();

  useEffect(() => {
    if (addUserState.success) {
      router.refresh();
    }
  }, [addUserState.success]);

  return (
    <div className="bg-white shadow-md rounded-md p-6 w-[40rem] h-[27rem] flex flex-col justify-center">
      <form action={addUserAction}>
        <h2 className="text-2xl font-semibold mb-6">Add User</h2>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="mt-1 p-2 w-full border rounded-md"
        />

        <label
          htmlFor="email"
          className="block mt-4 text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="mt-1 p-2 w-full border rounded-md"
        />

        <label
          htmlFor="role"
          className="block mt-4 text-sm font-medium text-gray-600"
        >
          Role
        </label>
        <select
          name="role"
          id="role"
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value={Role.ADMIN}>ADMIN</option>
          <option value={Role.SUPERADMIN}>SUPERADMIN</option>
        </select>

        <SubmitButton title="Add User" />
        {/* <AlertDialogAdmin /> */}
      </form>
    </div>
  );
};

export default CardAddUser;
