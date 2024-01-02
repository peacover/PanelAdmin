"use server";

import { db } from "@/lib/database/db";

const getAllBusiness = async () => {
  try {
    const all_bus: TBusiness[] = await db.business.findMany({
      select: {
        id: true,
        name: true,
        imageUrl: true,
        description: true,
        createdAt: true,
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    // change form of date using typeScript
    // all_bus.map((bus) => {
    //   bus.updatedAt = bus.updatedAt.toISOString().slice(0, 10);
    // });
    return all_bus;
  } catch (e) {
    console.log("Error while getting all businesses: ", e);
    return [];
  }
};

export default getAllBusiness;
