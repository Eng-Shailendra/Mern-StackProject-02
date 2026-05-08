import fs from "node:fs";
import path from "node:path";
import handlebars from "handlebars"
import nodemailer from "nodemailer"


export const sendMail = async (email, token) => {

    const filePath = path.join(import.meta.dirname, "template.hbs");
    const emailTemplateSource = fs.readFileSync(filePath, "utf-8");

    const template = handlebars.compile(emailTemplateSource);
    const htmlTOSend = template({ token: encodeURIComponent(token) })


    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
    try {
        await transport.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Verify mail",
            html: htmlTOSend
        })
        console.log("Verification mail send successfully 🎉");
    } catch (err) {
        console.log(err);
    }



} 