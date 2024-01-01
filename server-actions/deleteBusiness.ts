"use server";

import { db } from "@/lib/database/db";

const deleteBusiness = async (businessId: string) => {

  try {
    console.log("businessId", businessId);
    const del_bus = await db.business.delete({
      where: {
          id: businessId as string,
      },
  });
    return true;
  } catch (e) {
    console.log("hna kayn mouchkil:", e);
  }
};

export default deleteBusiness;
