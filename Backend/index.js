import dotnet from "dotnet";
dotnet.config({ quite: true });
import express, { json } from "express";
import { connectDB } from "./config/databse";
import router from "./routers/auth-router";

const app = express();
const PORT = process.env.PORT_URL || 3000;
connectDB();

//! middileware  
app.use()
app.use("/v1/api", router);



app.listen(PORT, (err) => {
    if (err)
        console.log(err);
    console.log("Server Start on port", PORT);
})