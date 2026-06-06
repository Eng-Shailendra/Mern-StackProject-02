
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: { type: String, require: true },
    stock: {
        type: Number,
        require: true
    },
    imageUrls: [{
        url: {
            type: String,
            require: true,
        },
        public_id: {
            type: String,
            require: true
        }
    }],
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: "user"
    },
    rating: { type: Number, default: 0 },

    numReviews: { type: Number, default: 0 }
}, { timestamps: true })
export const Product = mongoose.model("product", productSchema);
