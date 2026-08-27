import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST;
const mailPort = process.env.MAIL_PORT;
const mailUser = process.env.MAIL_USER;
const mailPassword = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: Number(mailPort),
  auth: {
    user: mailUser,
    pass: mailPassword,
  },
});

async function sendEmail(
  email: string,
  subject: string,
  messageText: string
) {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text: messageText,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao enviar email.");
  }
}

export default {
  sendEmail,
};