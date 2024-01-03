"use server";

import { cookieName } from "@/constants";
import { validateJWT } from "@/middleware";
import { cookies } from "next/headers";

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? "";
};

export const getUserId = async () => {
  try {
    const cookie = await getCookie(cookieName);
    const res = await fetch("http://localhost:3000/api/users/me", {
      headers: {
        Cookie: `${cookieName}=${cookie};`,
      },
      credentials: "include",
      method: "GET",
    },

    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getJwtId = async (cookie: string) => {
  try {
    if (!cookie) return null;
    const jwt_id = (await validateJWT(cookie)) as string;
    return jwt_id;
  } catch (e) {
    return null;
  }
};
