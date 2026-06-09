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
            fullname: "Admin",
            email: "admin@example.com",
            password: adminPass,
            role: "admin",
            isVerified: true,
        });

        const user1 = await User.create({
            fullname: "John Doe",
            email: "john@example.com",
            password: userPass,
            role: "user",
            isVerified: true,
        });

        const user2 = await User.create({
            fullname: "Jane Roe",
            email: "jane@example.com",
            password: userPass,
            role: "user",
            isVerified: true,
        });

        const products = await Product.insertMany([
            {
                name: "Essence Mascara Lash Princess",
                description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
                price: 9.99,
                category: "beauty",
                stock: 99,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp", public_id: "p1" }],
                admin: admin._id,
            },
            {
                name: "Eyeshadow Palette with Mirror",
                description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
                price: 19.99,
                category: "beauty",
                stock: 34,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp", public_id: "p2" }],
                admin: admin._id,
            },
            {
                name: "Powder Canister",
                description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
                price: 14.99,
                category: "beauty",
                stock: 89,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp", public_id: "p3" }],
                admin: admin._id,
            },
            {
                name: "Red Lipstick",
                description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
                price: 12.99,
                category: "beauty",
                stock: 91,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp", public_id: "p4" }],
                admin: admin._id,
            },
            {
                name: "Red Nail Polish",
                description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
                price: 8.99,
                category: "beauty",
                stock: 79,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp", public_id: "p5" }],
                admin: admin._id,
            },
            {
                name: "Calvin Klein CK One",
                description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
                price: 49.99,
                category: "fragrances",
                stock: 29,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp", public_id: "p6" }],
                admin: admin._id,
            },
            {
                name: "Chanel Coco Noir Eau De",
                description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
                price: 129.99,
                category: "fragrances",
                stock: 58,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp", public_id: "p7" }],
                admin: admin._id,
            },
            {
                name: "Dior J'adore",
                description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
                price: 89.99,
                category: "fragrances",
                stock: 98,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp", public_id: "p8" }],
                admin: admin._id,
            },
            {
                name: "Dolce Shine Eau de",
                description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
                price: 69.99,
                category: "fragrances",
                stock: 4,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp", public_id: "p9" }],
                admin: admin._id,
            },
            {
                name: "Gucci Bloom Eau de",
                description: "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
                price: 79.99,
                category: "fragrances",
                stock: 91,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp", public_id: "p10" }],
                admin: admin._id,
            },
            {
                name: "Annibale Colombo Bed",
                description: "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
                price: 1899.99,
                category: "furniture",
                stock: 88,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp", public_id: "p11" }],
                admin: admin._id,
            },
            {
                name: "Annibale Colombo Sofa",
                description: "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
                price: 2499.99,
                category: "furniture",
                stock: 60,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp", public_id: "p12" }],
                admin: admin._id,
            },
            {
                name: "Bedside Table African Cherry",
                description: "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
                price: 299.99,
                category: "furniture",
                stock: 64,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp", public_id: "p13" }],
                admin: admin._id,
            },
            {
                name: "Knoll Saarinen Executive Conference Chair",
                description: "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
                price: 499.99,
                category: "furniture",
                stock: 26,
                imageUrls: [{ url: "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-chair/1.webp", public_id: "p14" }],
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
