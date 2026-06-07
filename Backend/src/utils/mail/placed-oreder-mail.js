import fs from "node:fs";
import path from "node:path";
import handlebars from "handlebars";
import { mailTransport } from "../../config/mailTransport.js";

export const orderPlacedMail = async (email, orderData) => {
    const filePath = path.join(import.meta.dirname, "placed-order-template.hbs");
    const emailTemplateSource = fs.readFileSync(filePath, "utf-8");
    const template = handlebars.compile(emailTemplateSource);

    const templateData = {
        customerName: orderData?.customerName || "Customer",
        orderId: orderData?.orderId || "#N/A",
        orderDate: orderData?.orderDate || new Date().toLocaleDateString(),
        deliveryAddress: orderData?.deliveryAddress || "Not provided",
        items: orderData?.items || [],
        subtotal: orderData?.subtotal || "",
        shipping: orderData?.shipping || "",
        total: orderData?.total || "",
        supportEmail: process.env.SUPPORT_EMAIL || "support@example.com",
    };

    const htmlToSend = template(templateData);

    try {
        const transporter = mailTransport();
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Your order has been placed",
            html: htmlToSend,
        });
        console.log("Placed order mail sent successfully 🎉");
    } catch (err) {
        console.log(err);
    }
};