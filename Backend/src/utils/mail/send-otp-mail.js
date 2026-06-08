import nodemailer from "nodemailer";
import { mailTransport } from "../../config/mailTransport.js";

export async function sendOtpMail(email, otp) {
    try {
        await mailTransport().sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify mail",
            html: `<h1>The opt ${otp} valid only for 10 minutes</h1>`
        })
        console.log("Otp is sended successfully");
    } catch (err) {
        console.log(err);
    }
}