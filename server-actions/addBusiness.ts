import { db } from "@/lib/database/db";
import { getUserId } from "@/lib/utils/getUserId";

const addBusiness = async (name: string, imageUrl: string, description?: string) => {
    const userId = await getUserId();
    if (!userId) {
        throw new Error("Unauthorized!");    
    }
    const business = await db.business.create({
        data: {
            name,
            imageUrl,
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