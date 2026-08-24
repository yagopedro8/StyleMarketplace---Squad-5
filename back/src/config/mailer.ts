import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
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