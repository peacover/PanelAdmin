"use client";

import { TUser } from "@/lib/types/TUser";
import deleteUser from "@/server-actions/deleteUser";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CardUser : React.FC<{user: TUser, role:Role}> = ({user, role}) => {
    const[error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleDelUser = async () => {
        try {
            await deleteUser(user.id, role);
            router.refresh();
        }
        catch(err) {
            console.error(err);
            setError("Error deleting user");
        }
    }
    return (
        <ul className="border-4 border-black">
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.role}</h1>
            <h1>{user.updatedAt?.toString()}</h1>
            {role === Role.SUPERADMIN && <button onClick={handleDelUser}>Delete</button>}
        </ul>
    );
};

export default CardUser;