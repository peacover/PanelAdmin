"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";
import { Role, Status } from "@prisma/client";
import { get } from "http";

const deleteUser = async (userId: string) => {
    try{
        const loggedInUserId = await getUserId();
        const loggedInUser = await db.user.findUnique({
            where: {
                id: loggedInUserId as string,
                status: Status.ACTIVE,
            },
        });
        if(!loggedInUser){
            throw new Error("Unauthorized!");
        }
        const user = await db.user.findUnique({
            where: {
                id: userId as string,
            },
        });
        if(!user){
            throw new Error("User not found!");
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