import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5c0299dff2fcca",
      pass: "e3708593c593b5"
    }
  });

const sendEmail = async (email: string, password: string) => {
  try {
    const info = await transport.sendMail({
      from: '"AdminPanel 👻" <no-reply@adminpanel.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome to PanelAdmin!",
      text: "Hello world?", // plain text body
      html: `<b>Hello world?</b> <br> <p>your password is ${password}</p>`, // html body
    });
    console.log("Message sent: %s", info);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
