'use server'
 
import { cookieName } from "@/constants";
import { db } from "@/lib/database/db";
import { getJwtId } from "@/lib/utils/getUserId";

import { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const cookie = req.cookies[cookieName] as string;
        const userId = await getJwtId(cookie) as string;
        if (!userId) {
            res.status(400).json({ message: "Invalid Token!" });
        }
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                status: true,
            },
        });
        if (!user || user.status === "DELETED") {
            // res.setHeader(
            //     "Set-Cookie",
            //     `${cookieName}=deleted; path=/ ; Max-Age=0`
            // );
            const ret = await fetch("http://localhost:3000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "credentials": "include",
                    // "Access-Control-Allow-Origin": "*",
                    Cookie: `${cookieName}=${cookie};`,

                },
            });
        }
        res.status(200).json(user?.id)
    }
    catch(e){
        res.status(400).json({ message: "Error while getting user!" });
    }
}

export default getUser;