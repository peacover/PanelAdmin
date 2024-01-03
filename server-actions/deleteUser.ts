"use server";

import { db } from "@/lib/database/db";
import { Role, Status } from "@prisma/client";

const deleteUser = async (userId: string, role: string) => {
    try{
        if(role !== Role.SUPERADMIN){
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
        return true;
    }
    catch(e){
        console.log("Error while deleting user: ", e);
        return false;
    }
};
export default deleteUser;