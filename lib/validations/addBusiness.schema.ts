import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const AddBusinessSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required")
    .max(20, "Name must be less than 20 characters"),
  // check image type and size
  //   image: z
  //     .any()
  //     .refine(
  //       (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //       `Max image size is 5MB.`
  //     )
  //     .refine(
  //       (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //       "Only .jpg, .jpeg, .png and .webp formats are supported."
  //     ),
  image: z.any(),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

export type TAddBusinessInput = z.infer<typeof AddBusinessSchema>;
