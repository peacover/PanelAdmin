"use server";

import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";
import { TAddBusinessInput } from "@/lib/validations/addBusiness.schema";
import { createClient } from "@supabase/supabase-js";

const addBusiness = async (
  name: string,
  image: File,
  description: string | null
) => {
  const userId = await getUserId();
  if (!userId) {
    throw new Error("Unauthorized!");
  }
  console.log("image: ", image);
//   if (!image) {
//     throw new Error("Image is required!");
//   }

  // Check if image size is within an acceptable range
//   const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
//   if (image.size > maxSizeInBytes) {
//     throw new Error("Image size exceeds the maximum allowed size (5MB).");
//   }

//   const supabase = createClient(SUP_URL, SUP_KEY);
//   console.log("image: ", image);
//   const { data, error } = await supabase.storage
//     .from("PanelAdminBucket")
//     .upload("test", image, {
//       contentType: "image/*",
//     });
//     const filepath = `${SUP_URL}/test`;
//     console.log("data: ", data);
//     console.log("filepath: ", filepath);
//   if (error) {
//     throw new Error("Error while uploading image!");
//   }
//     const image_url = data?.path || "";
    const image_url = "https://loremflickr.com/640/480?lock=5633708543442944";
  const business = await db.business.create({
    data: {
      name,
      imageUrl: image_url,
      description,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
export default addBusiness;
