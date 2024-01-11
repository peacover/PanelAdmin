"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";

const getMyRole = async () => {
    try{
        const userId = await getUserId();
        if(!userId){
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
        if(!role_user){
            throw new Error("User not found!");
        }
        return role_user.role;
    }
    catch(e){
        console.log("Error while getting role: ", e);
        return null;
    }
}

export default getMyRole;