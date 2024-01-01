import { TUser } from "@/lib/types/TUser";
import { Role } from "@prisma/client";
import React from "react";

const CardUser : React.FC<{user: TUser, role:Role}> = ({user, role}) => {
    return (
        <ul className="border-4 border-black">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.role}</h1>
            <h1>{user.updatedAt?.toString()}</h1>
            {role === Role.SUPERADMIN && <button>Delete</button>}
        </ul>
    );
};

export default CardUser;