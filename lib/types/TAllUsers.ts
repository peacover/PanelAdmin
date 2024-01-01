import { Role } from "@prisma/client";

type TUser = {
    id: string;
    name: string;
    email: string;
    role: Role;
    lastSignIn?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TAllUsers = {
    users_admin: TUser[];
    users_super_admin: TUser[];
    role: Role | null ;
} 