"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";
import { TAddBusinessInput } from "@/lib/validations/addBusiness.schema";
import { createClient } from "@supabase/supabase-js";

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
