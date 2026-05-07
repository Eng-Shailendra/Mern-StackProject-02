import { User } from "../models/user-model.js";
import bcrypt from 'bcrypt'

export async function regesterUser(req, res) {
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
        await newUser.save();

        // create token
        const token = 

        res.status(200).json({
            success: true,
            message: "User cereated successfully",
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

export function loginUser(req, res) {
    try {

    } catch (err) {
        console.log(err);
    }
}