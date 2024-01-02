"use client";

import { TState } from "@/lib/types/TFormState";
import { AddBusinessSchema } from "@/lib/validations/addBusiness.schema";
import addBusiness from "@/server-actions/addBusiness";
import upload_image from "@/server-actions/uploadImage";
import { useFormState } from "react-dom";

const SUP_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const SUP_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

const handleAddBusiness = async (prevState: TState, formData: FormData) => {
  const name = formData.get("name") as string | null;
  const image = formData.get("image") as File;
  const description = formData.get("description") as string | null;
  try {
    console.log("ana hna 1");
    
    const business = AddBusinessSchema.safeParse({
      name,
      image,
      description,
    });
    console.log("ana hna 2");
    if (!business.success) {
      return {
        error: business.error.message,
        success: false,
      };
    }
    console.log("ana hna 3");
    // await upload_image(image);
    
    // const supabase = createClient(SUP_URL, SUP_KEY);
    // const { data, error } = await supabase.storage
    //   .from("PanelAdminBucket")
    //   .upload("public" + image.name, image as File);
    //   const filepath = `${SUP_URL}/test`;
    //   if(data) console.log("data: ", data)
    //   else console.log("error: ", error)
    //   console.log("data: ", data);
    //   console.log("filepath: ", filepath);
    // await addBusiness(
    //   business.data.name,
    //   business.data.image,
    //   business.data.description ?? ""
    // );
    console.log("ana hna 4");
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};
const CardAddBusiness = () => {
  const [addBusState, addBusAction] = useFormState(handleAddBusiness, {
    error: null,
    success: false,
  });
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Add Business
        </button>
      </form>
      {/* show error if any */}
      {addBusState.error && <p>{addBusState.error}</p>}
    </div>
  );
};

export default CardAddBusiness;
