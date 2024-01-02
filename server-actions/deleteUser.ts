"use server";

import { db } from "@/lib/database/db";
import { Role } from "@prisma/client";

const deleteUser = async (userId: string, role: string) => {
    try{
        if(role !== Role.SUPERADMIN){
            throw new Error("Unauthorized!");
        }
        const del_user = await db.user.delete({
            where: {
                id: userId,
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