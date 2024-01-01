import { TAllUsers } from "@/lib/types/TAllUsers";
import getAllUsers from "@/server-actions/getAllUsers";
import { Role } from "@prisma/client";
import CardUser from "./CardUser";
import Link from "next/link";

const ListUsers = async () => {
  const { users_admin, users_super_admin, role }: TAllUsers =
    await getAllUsers();

  return (
    <div className="border-4 border-blue-500">
      <div>
        {role === Role.SUPERADMIN && <button>Delete My Account</button>
        && <Link href="/dashboard/adminManagement/addUser">Add Admin</Link>}
      </div>
      <div>
        {role === Role.SUPERADMIN && users_super_admin.length > 0 && (
          <>
            <h1 className="border-8 border-red-500">Role: Super Admins</h1>
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
              <h1 className="border-8 border-red-500">Role: Admins</h1>
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
