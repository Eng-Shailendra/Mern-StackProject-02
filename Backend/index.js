import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import userRouter from "./routers/auth-router.js";
import { connectDB } from "./config/databse.js";

const app = express();
const PORT = process.env.PORT || 3000;



//! middileware  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Database 
connectDB();


app.use("/v1/api", userRouter);



app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log("Server start successfully 🚀");
});