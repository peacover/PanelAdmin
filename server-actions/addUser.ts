"use server";

import { db } from "@/lib/database/db";
import { TAddUserInput } from "@/lib/validations/addUser.schema";
import bcrypt from "bcrypt";


const addUser = async ({name, email, role} : TAddUserInput) => {
    try {
        const check_email = await db.user.findUnique({
            where: {
                email,
            },
        });
        if (check_email) {
            throw new Error("Email already exists");
        }
        const generates_password = Math.random().toString(36).slice(-8);
        //send this password to the user email


        const hashed_password = await bcrypt.hash(generates_password, 10);
        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashed_password,
                role,
            },
        });
        return {"message": "User added successfully"};
    } catch (error) {
        throw new Error("Error while adding user!!");
    }
};

export default addUser;