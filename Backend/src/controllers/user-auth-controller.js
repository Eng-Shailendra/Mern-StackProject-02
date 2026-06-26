import { User } from "../models/user-model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { Session } from "../models/session-model.js";
import { json } from "node:stream/consumers";
import { sendOtpMail } from "../utils/mail/send-otp-mail.js";
import { sendToVerifyEmail } from "../utils/mail/send-to-Verify-Mail.js";
import { asyncWrapProviders } from "node:async_hooks";

export async function registerUser(req, res) {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(500).json({
                success: false,
                message: "Invalid inpute fields"
            });
        };
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User is already registerde 👍"
            });
        };
        //! Password  Hashing
        const salt = await bcrypt.genSalt(13);
        const newPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullname,
            email,
            password: newPassword

        });
        // create token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        newUser.token = token;
        await newUser.save();
        // have to send Email  
        sendToVerifyEmail(email, token)
        res.status(200).json({
            success: true,
            message: "User registered successfully cheack your mail",
            data: newUser
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }
}


export const emailVerification = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(400).json({
                success: false,
                message: "Token is missing"
            })
        }

        const token = authHeader.split(" ")[1]
        let decodedInfo
        try {
            decodedInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);

        } catch (err) {
            return res.status(400).json({
                success: false,
                message: "Token expired",
            });
        }
        const user = await User.findById(decodedInfo.id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not found"
            })
        }
        user.isVerified = true;
        user.token = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Somethig wrong"
        });
    }
}


export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both field are requreired",
            })
        }
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "Invalid email ",
            })
        }
        const matchpassword = await bcrypt.compare(password, userData.password);
        if (!matchpassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            })
        }
        if (!userData.isVerified) {
            return res.status(400).json({
                success: false,
                message: " cheack email for verification ",
            });
        }
        // Create session 
        const existingSession = await Session.findOne({ userId: userData._id });
        if (existingSession) {
            await Session.deleteOne({ userId: userData._id });
        }
        await Session.create({ userId: userData._id });

        // Access token
        const accessToken = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5d" });
        // Refersh token
        const refreshToken = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
        userData.isLogin = true;
        userData.token = refreshToken;
        await userData.save();

        return res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 5 * 24 * 60 * 60 * 1000 // 5 day
        }).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60 * 1000 // 10 day
        })
            .status(200).json({
                success: true,
                message: `wellcom ${userData.fullname}`,
                user: {
                    id: userData._id,
                    name: userData.fullname,
                    email: userData.email,
                    role: userData.role
                },
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal error "
        })
    }
}

// forgot password;
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is requried"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Not found any user"
            });
        }
        const otp = Math.floor(1000000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
        sendOtpMail(email, otp);
        user.otp = otp;
        user.otpExpire = expiry;
        await user.save();
        res.status(200).json({
            success: true,
            message: "we send otp cheack Email for verifiction"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
    }

}

export const verifyOtp = async (req, res) => {
    try {
        const { email } = req.params;
        const { otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "bad request"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not find ",
            });
        }
        if (!user.otp || !user.otpExpire) {
            return res.status(400).json({
                success: false,
                message: "Otp not generated or already verified"
            });
        }
        if (user.otpExpire < new Date()) {
            return res.status(400).json({
                success: false,
                message: "opt has expire"
            })
        }
        if (otp !== user.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid opt "
            })
        }
        user.otp = null;
        user.otpExpire = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Otp verifed successfully",
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "Internal error "
        })
    }
}

export const updatePassword = async (req, res) => {

    try {
        const { email } = req.params;
        const { changePassword, conformPassword } = req.body;
        if (!changePassword || !conformPassword && changePassword !== conformPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not valid"
            })
        }
        const password = changePassword.trim();
        const user = await User.findOne({ email });

        const salt = await bcrypt.genSalt(13);
        const newPassword = await bcrypt.hash(password, salt);

        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Internal error "
        })
    }
}


export const LogoutUser = async (req, res) => {
    const token = req.cookies.token;

    await Session.deleteOne({ userId: req.user._id })
    const user = await User.findById({ _id: req.user._id })
    user.isLogin = false;
    await user.save();
    sessionStorage.clear();
    res.clearCookie("token")
        .status(200).json({
            success: true,
            message: "Logged out successfully",
        });

}