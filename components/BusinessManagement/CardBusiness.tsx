"use client";

import deleteBusiness from "@/server-actions/deleteBusiness";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CardBusiness: React.FC<{ bus: TBusiness }> = async ({ bus }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleDeleteBus = async () => {
    try {
      await deleteBusiness(bus.id);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Error deleting business");
    }
  };
  return (
    <div key={bus.id} className="border-4 border-black">
      <h1>{bus.name}</h1>
      <h1>{bus.imageUrl}</h1>
      <Image
        src={bus.imageUrl}
        alt="Picture of the author"
        width={500}
        height={300}
      />
      <h1>{bus.updatedAt?.toLocaleString()}</h1>
      <h1>{bus.owner?.name}</h1>

      <button onClick={handleDeleteBus}>
        Delete
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
export default CardBusiness;
