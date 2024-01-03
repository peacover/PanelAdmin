"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";

const addBusiness = async (
  name: string,
  imagePath: string,
  description: string | null
) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      throw new Error("Unauthorized!");
    }
    if (!imagePath) {
      throw new Error("Image is required!");
    }
    const business = await db.business.create({
      data: {
        name,
        imageUrl: imagePath,
        description,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (e) {
    throw new Error("Error while adding business!");
  }
};
export default addBusiness;
