import Razorpay from "razorpay";

const paymentInstance = new Razorpay({
    key_id: process.env.RZP_API_KEY,
    key_secret: process.env.RZP_TEST_KEY,
});

export { paymentInstance }