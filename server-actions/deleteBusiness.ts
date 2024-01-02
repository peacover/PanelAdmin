"use server";

import { db } from "@/lib/database/db";

const deleteBusiness = async (businessId: string) => {

  try {
    const del_bus = await db.business.delete({
      where: {
          id: businessId as string,
      },
  });
    return true;
  } catch (e) {
    console.log("Error while deleting business: ", e);
    return false;
  }
};

export default deleteBusiness;
