import { cookieName } from "@/constants";
import { NextApiRequest, NextApiResponse } from "next";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[cookieName];
    if (!token) {
        return res.status(401).json({ message: "User is not logged in" });
    }
    try {
        res.setHeader(
            "Set-Cookie",
            `${cookieName}=deleted; path=/ ; Max-Age=0`
        );
        return res.status(200).json({ message: "success" });
    }
    catch (e) {
        console.log("error in logout: ", e);
        return res.status(500).json({ message: "Something went wrong in Logout!" });
    }
}
export default logout;