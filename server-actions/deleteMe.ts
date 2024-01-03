"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";
import { Status } from "@prisma/client";

const deleteMe = async () => {
    try {
        const userId = await getUserId();
        if (!userId) {
            throw new Error("Unauthorized!");
        }
        const del_user = await db.user.update({
            where: {
                id: userId as string,
            },
            data: {
                status: Status.DELETED,
            },
        });
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return true;
    }
    catch (e) {
        console.log("Error while deleting user: ", e);
        return false;
    }
}

export default deleteMe;