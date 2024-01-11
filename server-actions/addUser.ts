"use server";

import { db } from "@/lib/database/db";
import { TAddUserInput } from "@/lib/validations/addUser.schema";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { render } from "@react-email/render";
import EmailTemplate from "@/components/EmailTemplate/EmailTemplate";

const addUser = async ({ name, email, role }: TAddUserInput) => {
  try {
    const check_email = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (check_email && check_email.status !== "DELETED") {
      throw new Error("Email already exists");
    }
    const generated_password = Math.random().toString(36).slice(-8);
    //send this password to the user email
    const resend = new Resend(process.env.RESEND_API_KEY);
    const ret_send_email = await resend.emails.send({
      from: "PanelAdmin <noreply@paneladmin.website>",
      to: email,
      subject: "Welcome to PanelAdmin!",
      html: render(EmailTemplate({ name, email, password: generated_password })),
    });
    if (ret_send_email.error) {
      throw new Error("Error while sending email");
    }
    const hashed_password = await bcrypt.hash(generated_password, 10);
    if (check_email && check_email.status === "DELETED") {
      const user = await db.user.update({
        where: {
          email,
        },
        data: {
          name,
          password: hashed_password,
          role,
          status: "ACTIVE",
        },
      });
      return { message: "User added successfully" };
    }
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashed_password,
        role,
      },
    });
    return { message: "User added successfully" };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default addUser;
