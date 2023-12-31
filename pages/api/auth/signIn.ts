import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/database/db";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookieName, jwtSecret } from "@/constants";
import { serialize } from "cookie";

const createJWT = async (userId: string) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ id: userId })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(jwtSecret));
};

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // const { email, password } = { "email": "Marty_Auer39@gmail.com", "password": "password" };
    const { email, password } = req.body;
    const user_email = await db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        password: true,
        email: true,
      },
    });
    if (!user_email) {
      res.status(400).json({ message: "Email Not Found!" });
    }

    try {
      if (!user_email?.password)
        res.status(400).json({ message: "Password Not Found!" });
      else {
        const is_pass_identical: any = await bcrypt.compare(
          password,
          user_email.password
        );
        if (is_pass_identical) {
          const jwt = await createJWT(user_email.id);
          res.setHeader(
            "Set-Cookie",
            serialize(cookieName as string, jwt, {
              httpOnly: true,
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            })
          );
          res.status(200).json({ message: "Login successfully" });
        } else {
          res.status(400).json({ message: "Wrong Password!" });
        }
      }
    } catch (e) {
      res.status(400).json({ message: "Something went wrong in auth!" });
    }
  } else {
    res.status(400).json({ message: "Invalid Request Method!" });
  }
};

export default signIn;
