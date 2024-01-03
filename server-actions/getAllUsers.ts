"use server";

import { db } from "@/lib/database/db";
import { TAllUsers } from "@/lib/types/TAllUsers";
import { TUser } from "@/lib/types/TUser";
import { getUserId } from "@/lib/utils/getUserId";
import { Role, Status } from "@prisma/client";

const getAllUsers = async () => {
  try {
    console.log("getAllUsers");
    const userId = await getUserId();
    console.log("userId: ", userId);
    if (!userId) {
      throw new Error("Unauthorized!");
    }
    const role_user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });
    console.log("ha ana : ", role_user);
    const users_admin: TUser[] = await db.user.findMany({
      where: {
        role: Role.ADMIN,
        status: Status.ACTIVE,
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        lastSignIn: true,
      },
      orderBy: {
        lastSignIn: "desc",
      },
    });
    console.log("users_admin: ", users_admin);
    if (role_user?.role === Role.SUPERADMIN) {
      const users_super_admin: TUser[] = await db.user.findMany({
        where: {
          role: Role.SUPERADMIN,
          status: Status.ACTIVE,
          id: {
            not: userId,
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          lastSignIn: true,
        },
        orderBy: {
          lastSignIn: "desc",
        },
      });
      console.log("users_super_admin: ", users_super_admin);
      const ret: TAllUsers = {
        users_admin: users_admin,
        users_super_admin: users_super_admin,
        role: Role.SUPERADMIN,
      };
      return ret;
    } else {
      const ret: TAllUsers = {
        users_admin: users_admin,
        users_super_admin: [],
        role: Role.ADMIN,
      };
      return ret;
    }
  } catch (e) {
    console.log("Error while getting all users: ", e);
    return {
      users_admin: [],
      users_super_admin: [],
      role: null,
    };
  }
};
export default getAllUsers;
