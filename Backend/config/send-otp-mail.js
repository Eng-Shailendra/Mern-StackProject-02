import nodemailer from "nodemailer";

export async function sendOtpMail(email, otp) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    })
    try {
        await transport.sendMail({
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