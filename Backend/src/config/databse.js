import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Data base connecte seccessfully ✔");
    } catch (err) {
        console.log(err);
    }
}