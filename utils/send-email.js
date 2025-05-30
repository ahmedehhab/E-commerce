import nodemailer from "nodemailer";
import { catchError } from "./error-handler.js";


const sendEmail=async (email,subject,html)=>{
    const transporter=nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
    };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
