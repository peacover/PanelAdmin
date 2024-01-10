import { TAllUsers } from "@/lib/types/TAllUsers";
import getAllUsers from "@/server-actions/getAllUsers";
import { Role } from "@prisma/client";
import Link from "next/link";
import DelMeButton from "./deleteMe";
import SuperAdminTable from "./SuperAdminTable";
import AdminTable from "./AdminTable";

const ListUsers = async () => {
  const { users_admin, users_super_admin, role }: TAllUsers =
    await getAllUsers();

  return (
    <div className="border-4 border-blue-500 p-4">
      <div className="mb-4">
        {role === Role.SUPERADMIN && (
          <div className="flex items-center space-x-4">
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
            <SuperAdminTable users={users_super_admin} role={role}/>
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
              {role === Role.SUPERADMIN ? (
                <SuperAdminTable users={users_admin} role={role} />
              ) : (
                <AdminTable users={users_admin} role={role} />
              )}
            </>
          )}
      </ul>
    </div>
  );
};

export default ListUsers;
