import { User } from "../models/user-model.js";
import jwt from 'jsonwebtoken'

export const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
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
