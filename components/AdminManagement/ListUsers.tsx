// "use client";

import { TAllUsers } from "@/lib/types/TAllUsers";
import getAllUsers from "@/server-actions/getAllUsers";
import { Role } from "@prisma/client";
import CardUser from "./CardUser";
import Link from "next/link";
import deleteMe from "@/server-actions/deleteMe";
import { useRouter } from "next/navigation";
import { TUser } from "@/lib/types/TUser";
import { useEffect, useState } from "react";
import DelMeButton from "./deleteMe";

const ListUsers = async () => {
       const { users_admin, users_super_admin, role }: TAllUsers =
        await getAllUsers();
  // const router = useRouter();
  // const [users_admin, setUsers_admin] = useState<TUser[]>([]);
  // const [users_super_admin, setUsers_super_admin] = useState<TUser[]>([]);
  // const [role, setRole] = useState<Role>();
  // const handleDelMyAcc = async () => {
  //   try {
  //     await deleteMe();
  //     router.push("/auth/signIn");
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
  // };
  // useEffect(() => {
  //   const getUsers = async () => {
  //     const { users_admin, users_super_admin, role }: TAllUsers =
  //       await getAllUsers();
  //     setUsers_admin(users_admin);
  //     setUsers_super_admin(users_super_admin);
  //     setRole(role as Role);
  //   };
  //   getUsers();
  // }
  // , []);
  return (
    <div className="border-4 border-blue-500 p-4">
      <div className="mb-4">
        {role === Role.SUPERADMIN && (
          <div className="flex items-center space-x-4">
            {/* <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete My Account
            </button> */}
            <DelMeButton />
            <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link href="/dashboard/adminManagement/addUser">Add Admin</Link>
            </div>
          </div>
        )}
      </div>
      <div>
        {role === Role.SUPERADMIN && users_super_admin.length > 0 && (
          <>
            <h1 className="text-2xl font-bold border-b-2 border-red-500 mb-4">
              Role: Super Admins
            </h1>
            {users_super_admin.map((user) => (
              <CardUser key={user.id} user={user} role={role} />
            ))}
          </>
        )}
      </div>
      <ul>
        {(role === Role.SUPERADMIN || role === Role.ADMIN) &&
          users_admin.length > 0 && (
            <>
              <h1 className="text-2xl font-bold border-b-2 border-red-500 mb-4">
                Role: Admins
              </h1>
              {users_admin.map((user) => (
                <CardUser key={user.id} user={user} role={role} />
              ))}
            </>
          )}
      </ul>
    </div>
  );
};

export default ListUsers;
