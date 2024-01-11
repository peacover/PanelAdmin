"use client";

import { TState } from "@/lib/types/TFormState";
import { AddBusinessSchema } from "@/lib/validations/addBusiness.schema";
import addBusiness from "@/server-actions/addBusiness";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { v4 as uuid_v4 } from "uuid";
import SubmitButton from "../ui/SubmitButton";

const handleAddBusiness = async (prevState: TState, formData: FormData) => {
  const name = formData.get("name") as string | null;
  const image = formData.get("image") as File;
  const description = formData.get("description") as string | null;
  try {
    const business = AddBusinessSchema.safeParse({
      name,
      image,
      description,
    });
    if (!business.success) {
      return {
        error: business.error.message,
        success: false,
      };
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    const file_name = name + "-" + uuid_v4();
    const { data, error } = await supabase.storage
      .from("PanelAdminBucket")
      .upload(file_name, image as File);
    const filePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/PanelAdminBucket/${file_name}`;

    if (error) {
      return {
        error: "Error uploading image, ensure it is an image!",
        success: false,
      };
    }

    // const {data:filePath} = supabase.storage.from("PanelAdminBucket").getPublicUrl(file_name);
    await addBusiness(
      business.data.name,
      filePath,
      business.data.description ?? ""
    );
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: "Error adding business",
      success: false,
    };
  }
};

const CardAddBusiness = () => {
  const [addBusState, addBusAction] = useFormState(handleAddBusiness, {
    error: null,
    success: false,
  });
  const router = useRouter();
  useEffect(() => {
    if (addBusState.success) {
      router.refresh();
    }
  }, [addBusState.success]);

  return (
    <div>
      <form
        action={addBusAction}
        className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6">Add Business</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            required
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <SubmitButton title="Add Business" />
      </form>
      {/* show error if any */}
      {addBusState.error && <p>{addBusState.error}</p>}
      {/* show success message if any */}
      {addBusState.success && <p>Business Added</p>}
    </div>
  );
};

export default CardAddBusiness;
