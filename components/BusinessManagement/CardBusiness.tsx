"use client";

import deleteBusiness from "@/server-actions/deleteBusiness";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CardBusiness: React.FC<{ bus: TBusiness }> = ({ bus }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteBus = async () => {
    try {
      await deleteBusiness(bus.id);
      toast.success("Business deleted");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting business");
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="flex flex-col h-full">
      <Suspense fallback={<p>Loading...</p>}>
        <Card className="flex flex-col h-full rounded overflow-hidden">
          <div className="rrelative flex-shrink-0 overflow-hidden rounded">
            <Image
              src={bus.imageUrl}
              alt="Picture of the author"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-[250px]"
              priority={true}
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              aria-label="Business Image"
            />
          </div>
          <CardHeader className="flex flex-col flex-grow">
            <CardTitle>{bus.name}</CardTitle>
            <CardDescription>
              {bus.description?.slice(0, 100).concat("...")}
            </CardDescription>
            {/* add label and time stamp */}
            <CardDescription>Added by: {bus.owner?.name}</CardDescription>
            <CardDescription>
              Time: {bus.updatedAt?.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Button onClick={handleDeleteBus}>Delete</Button>
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
};

export default CardBusiness;
