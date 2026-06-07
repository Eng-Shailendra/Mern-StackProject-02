import nodemailer from 'nodemailer';

export const mailTransport = () => {
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
}
