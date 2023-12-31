import { cookieName } from "@/constants";
import { db } from "@/lib/database/db";
import { getJwtId } from "@/lib/utils/getUserId";

import { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        // console.log("req.cookies: ", req.cookies);
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
            },
        });
        res.status(200).json(user?.id);
    }
    catch(e){
        res.status(400).json({ message: "Error while getting user!" });
    }
}

export default getUser;