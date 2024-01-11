import CardAddUser from "@/components/AdminManagement/CardAddUser";
import getMyRole from "@/server-actions/getMyRole";
import { Role } from "@prisma/client";

const addUserPage = async () => {
  const myRole = await getMyRole();
  return myRole === Role.SUPERADMIN ? (
    <div className="flex justify-center items-center h-screen w-full">
      <CardAddUser />
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen w-full">
      <h1 className="text-4xl font-semibold text-gray-700">
        You are not authorized to view this page.
      </h1>
    </div>
  );
};

export default addUserPage;
