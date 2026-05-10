import { User } from "../models/user-model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { sendMail } from "../config/send-mail.js";
import { Session } from "../models/session-model.js";

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
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: "5m" });
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
        
        if (!bearer || !email) {
            return res.status(400).json({
                success: false,
                message: "Details are not valid"
            });
        };
        const token = bearer.split(" ")[1];
        const verify = jwt.verify(token, process.env.SECRET_KEY);
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
        const accessToken = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        // Refersh token
        const refershToken = jwt.sign({ id: userData._id }, process.env.SECRET_KEY, { expiresIn: "20d" });

        user.isLogin = true;
        await user.save();
        return res.status(200).json({
            success: true,
            message: `wellcom ${user.username}`,
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