
import { paymentInstance } from "../config/razorpay.js"


export const createdOrder = (req, res) => {
    const option = {
        amount: req.body.amount * 100,
        currency: "INR",
        recepit: crypto.randomBytes(10).toString("hex"),
    }
    try {
        const order = paymentInstance.orders.create(option)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Unabel to create your orrder payment"
            })
        }
        res.status(200).json({
            success: true,
            message: "order suuccessfully created",
            data: order
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Internal error to on payment order"
        })
    }

}

export const paymentVerify = (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        const generate_signature = crypto.createHmac("sha226", process.env.RZP_TEST_KEY).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");
        if (razorpay_signature !== generate_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment is not varified "
            })
        }
        res.status(200).json({
            success: true,
            message: "Payment is successfully verified "
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Internal error to on payment verify"
        })
    }
}