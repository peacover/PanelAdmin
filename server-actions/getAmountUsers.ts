"use server";

import { db } from "@/lib/database/db";
import { Role } from "@prisma/client";

const getAmountUsers = async () => {
    try {
        const nb_admin = await db.user.count({
            where: {
                role: Role.ADMIN,
                status: "ACTIVE",
            }
        });
        const nb_super_admin = await db.user.count({
            where: {
                role: Role.SUPERADMIN,
                status: "ACTIVE",
            }
        });
        if (nb_admin > 0 || nb_super_admin > 0)
            return { nb_admin, nb_super_admin };
        else
            return { nb_admin: 0, nb_super_admin: 0 };
    }
    catch (e) {
        console.log("Error while getting amount of users: ", e);
        return { nb_admin: 0, nb_super_admin: 0 };
    }
}

export default getAmountUsers;