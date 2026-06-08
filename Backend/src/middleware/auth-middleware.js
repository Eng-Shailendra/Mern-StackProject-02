import { User } from "../models/user-model.js";
import jwt from 'jsonwebtoken'

export const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is not avliabel"
            })
        }
        // const bearerToken = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        user = await User.findById(decoded.id).select("-password");
        sessionStorage.setItem("user", user)
        req.user;
        next();
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: "Unable to verify"
        })
    }
}


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
    });
};
