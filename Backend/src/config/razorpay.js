import Razorpay from "razorpay";
import products from "razorpay/dist/types/products";

const paymentInstance = new Razorpay({
    key_id: process.env.RZP_API_KEY,
    key_secret: process.env.RZP_TEST_KEY,
});

export { paymentInstance }