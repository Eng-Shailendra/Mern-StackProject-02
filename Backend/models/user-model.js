import mongoose from "mongoose";
import { type } from "node:os";

const userSchema = mongoose.Schema({
    username: {
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
    isLogin: {
        type: Boolean,
        default: false
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
    otpExpire: {
        type: Date,
        default: null
    },
}, { timestamp: true });

export const User = mongoose.model("Users", userSchema);

