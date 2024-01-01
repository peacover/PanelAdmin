"use client";

import deleteBusiness from "@/server-actions/deleteBusiness";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardBusiness: React.FC<{ bus: TBusiness }> = async ({ bus }) => {
  const router = useRouter();
  const handleDeleteBus = async () => {
    try {
      await deleteBusiness(bus.id);
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div key={bus.id} className="border-4 border-black">
      <h1>{bus.name}</h1>
      <h1>{bus.imageUrl}</h1>
      <Image
        src={bus.imageUrl}
        alt="Picture of the author"
        width={300}
        height={300}
      />
      <h1>{bus.updatedAt?.toString()}</h1>
      <h1>{bus.owner?.name}</h1>

      {/* handle confirmation modal */}
      <button id={bus.id} onClick={handleDeleteBus} type="button">
        Delete
      </button>
    </div>
  );
};
export default CardBusiness;
