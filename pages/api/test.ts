import { db } from "@/lib/database/db";
import { de } from "@faker-js/faker";
import { NextApiRequest, NextApiResponse } from "next";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // const find_buss = await db.user.findUnique({
    //   where: {
    //     id: "0b415eac-b6c6-450f-be92-d044cdac9c07",
    //   },
    // });
    // const fid = await db.business.findUnique({
    //     where: {
    //         id: "1c853ee6-c563-42b0-8af6-420c172d61a3",
    //     },
    // });
    const del_bus = await db.business.delete({
        where: {
            id: "e6200c3f-1100-4e55-8258-8093a0effab1",
        },
    });
    // const fid2 = await db.business.findUnique({
    //     where: {
    //         id: "1c853ee6-c563-42b0-8af6-420c172d61a3",
    //     },
    // });

    // console.log("find_buss: ", del_bus, fid2);
    return res.status(200).json(del_bus);
  } catch (e) {
    console.log("hna kayn mouchkil:", e);
  }
};

export default test;
