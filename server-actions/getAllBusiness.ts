import { db } from "@/lib/database/db";

const getAllBusiness = async () => {
    const all_bus : TBusiness[] = await db.business.findMany({
        select: {
            id: true,
            name: true,
            imageUrl: true,
            description: true,
            updatedAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            updatedAt: "asc",
        },
    });
    return all_bus;
};

export default getAllBusiness;