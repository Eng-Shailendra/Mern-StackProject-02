import mongoose from "mongoose";

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
    otpExprire: {
        type: Date,
        default: null
    },
}, { timestamp: true });

export const User = mongoose.model("Users", userSchema);

