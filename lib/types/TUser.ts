import { Role } from "@prisma/client";

export type TUser = {
    id: string;
    name: string;
    email: string;
    role: Role;
    lastSignIn?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}