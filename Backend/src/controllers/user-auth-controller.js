import { User } from "../models/user-model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { sendMail } from "../config/send-mail.js";
import { Session } from "../models/session-model.js";
import { json } from "node:stream/consumers";
import { verify } from "node:crypto";
import { sendOtpMail } from "../config/send-otp-mail.js";

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
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
            username,
            email,
            password: newPassword

        });


        // create token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "5m" });
        newUser.token = token;
        await newUser.save();

        // have to send Email  
        sendMail(email, token)

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

export const emailVarification = async (req, res) => {
    try {
        const bearer = req.headers.authorization;
        let { email } = req.body;

        if (!bearer || !email) {
            return res.status(400).json({
                success: false,
                message: "Details are not valid"
            });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        const token = bearer.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verify) {
            return res.status(400).json({
                success: false,
                message: "Invalid token"
            });
        }
        user.isVerified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Thank for verification, now you can login"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal error"
        })
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
                message: "Invalid email",
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
        const accessToken = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10d" });
        // Refersh token
        const refershToken = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: "20d" });

        userData.isLogin = true;
        await userData.save();
        return res.status(200).json({
            success: true,
            message: `wellcom ${userData.username}`,
            accessToken,
            refershToken,
            user: {
                username: userData.username,
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
        console.log(req.params);
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