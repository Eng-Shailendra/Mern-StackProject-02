import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectDB } from "./src/config/databse.js";
import { User } from "./src/models/user-model.js";
import { Product } from "./src/models/product-model.js";
import { Order } from "./src/models/order-model.js";

async function seed() {
    try {
        await connectDB();

        // clear existing data
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        const salt = await bcrypt.genSalt(10);
        const adminPass = await bcrypt.hash("admin123", salt);
        const userPass = await bcrypt.hash("password123", salt);

        const admin = await User.create({
            username: "Admin",
            email: "admin@example.com",
            password: adminPass,
            role: "admin",
            isVerified: true,
        });

        const user1 = await User.create({
            username: "John Doe",
            email: "john@example.com",
            password: userPass,
            role: "user",
            isVerified: true,
        });

        const user2 = await User.create({
            username: "Jane Roe",
            email: "jane@example.com",
            password: userPass,
            role: "user",
            isVerified: true,
        });

        const products = await Product.insertMany([
            {
                name: "Red T-Shirt",
                description: "Comfortable cotton t-shirt",
                price: 19.99,
                category: "Clothing",
                stock: 100,
                imageUrls: [{ url: "https://via.placeholder.com/300x300?text=Red+T-Shirt", public_id: "p1" }],
                admin: admin._id,
            },
            {
                name: "Blue Jeans",
                description: "Slim fit denim jeans",
                price: 49.99,
                category: "Clothing",
                stock: 50,
                imageUrls: [{ url: "https://via.placeholder.com/300x300?text=Blue+Jeans", public_id: "p2" }],
                admin: admin._id,
            },
            {
                name: "Coffee Mug",
                description: "Ceramic mug 350ml",
                price: 9.5,
                category: "Home",
                stock: 200,
                imageUrls: [{ url: "https://via.placeholder.com/300x300?text=Coffee+Mug", public_id: "p3" }],
                admin: admin._id,
            },
            {
                name: "Wireless Mouse",
                description: "Ergonomic wireless mouse",
                price: 29.99,
                category: "Electronics",
                stock: 80,
                imageUrls: [{ url: "https://via.placeholder.com/300x300?text=Mouse", public_id: "p4" }],
                admin: admin._id,
            },
        ]);

        // create an order for user1
        const orderItems = [
            { product: products[0]._id, quantity: 2, price: products[0].price },
            { product: products[2]._id, quantity: 1, price: products[2].price },
        ];

        const totalAmount = orderItems.reduce((acc, i) => acc + i.quantity * i.price, 0);

        const order = await Order.create({
            user: user1._id,
            items: orderItems,
            totalAmount,
            shippingAddress: {
                fullName: "John Doe",
                phone: "9999999999",
                address: "123 Main St",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400001",
                country: "India",
            },
            paymentMethod: "ONLINE",
            paymentStatus: "PAID",
            orderStatus: "PLACED",
        });

        console.log("Seeding completed:");
        console.log("Users:", [admin.email, user1.email, user2.email]);
        console.log("Products:", products.map((p) => p.name));
        console.log("Sample order id:", order._id.toString());

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seed();
