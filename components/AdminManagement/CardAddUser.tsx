"use client";

import { TState } from "@/lib/types/TFormState";
import { AddUserSchema } from "@/lib/validations/addUser.schema";
import addUser from "@/server-actions/addUser";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

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

    return {
      error: null,
      success: true,
    };
  } catch (error) {
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
  const { pending } = useFormStatus()

  useEffect(() => {
    if (addUserState.success) {
      router.refresh();
    }
  }
  , [addUserState.success]);


  return (
    <div>
      <form action={addUserAction}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="role">Role</label>
        <select name="role" id="role">
          <option value={Role.ADMIN}>ADMIN</option>
          <option value={Role.SUPERADMIN}>SUPERADMIN</option>
        </select>
        <button type="submit" aria-disabled={pending}>Add User</button>
      </form>
      {/* show error if any */}
      {addUserState.error && <p>{addUserState.error}</p>}
      {/* show success message if any */}
      {addUserState.success && <p>User Added</p>}
      {/* show loading if any */}
      {pending && <p>Loading...</p>}
    </div>
  );
};

export default CardAddUser;
