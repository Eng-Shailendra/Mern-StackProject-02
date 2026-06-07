import express from "express";
import cors from "cors"
import userRouter from "./routers/auth-router.js";
import productRouter from "./routers/product-router.js"
import orderRouter from "./routers/order-router.js"

const app = express();




//! middileware  
app.use(cors({
    origin: process.env.FRONTEND_PATH_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/v1/api", userRouter);
app.use("/v1/api/product", productRouter);
app.use("/v1/api/order/", orderRouter);

export default app