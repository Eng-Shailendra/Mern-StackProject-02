import mongoose from 'mongoose';
import { User } from './user-model.js';

const sessionModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})
export const Session = mongoose.model("Session", sessionModel);