import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    otp: {
        type: String,
        default: null

    },
    role: {
        type: String,
        enum: ["admin", "user" , "master"],
        default: "user"
    }
}, { timestamp: true });

export const User = mongoose.model("Users", userSchema);

