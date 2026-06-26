# ![ShopNext Logo](./assets/logo.png)

ShopNext is a modern Full Stack MERN E-Commerce application that provides a complete online shopping experience. It includes secure authentication, product management, shopping cart, admin dashboard, email verification, password recovery, and responsive UI.

---

# 🚀 Features

## 👤 Authentication

- User Registration
- Secure Login & Logout
- JWT Authentication
- HttpOnly Cookie Authentication
- Email Verification
- Forgot Password
- OTP Verification
- Reset Password
- Session Management

---

## 🛒 Shopping

- Browse Products
- Product Details
- Search Products
- Category Filter
- Add to Cart
- Remove from Cart
- Quantity Update
- Responsive Shopping Experience

---

## 🛍️ Product Management (Admin)

- Create Product
- Update Product
- Delete Product
- Upload Product Image
- Product Inventory Management

---

## 📧 Email Services

- Account Verification Email
- OTP Email
- Password Reset Flow

---

## 🔒 Security

- Password Hashing using bcrypt
- JWT Access Token
- Protected Routes
- Email Verification
- Secure Cookies
- Authentication Middleware

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Nodemailer

---

# 📂 Project Structure

```
ShopNext/
│
├── Frontend/
│   ├── src/
│   ├── Components/
│   ├── Pages/
│   ├── Features/
│   ├── Context/
│   ├── Hooks/
│   └── Assets/
│
├── Backend/
│   ├── Controllers/
│   ├── Routes/
│   ├── Models/
│   ├── Middleware/
│   ├── Config/
│   ├── Utils/
│   ├── Uploads/
│   └── Server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/shopnext.git
```

```bash
cd shopnext
```

---

## 2. Install Dependencies

### Frontend

```bash
cd Frontend
npm install
```

### Backend

```bash
cd Backend
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=5000
DATABASE_URL=your_mongodb_connection

JWT_SECRET_KEY=
MAIL_USER=
MAIL_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

RZP_API_KEY=
RZP_TEST_KEY=

FRONTEND_PATH_URL=http://localhost:5173

```

---

# ▶ Run Project

## Backend

```bash
npm run dev
```

## Frontend

```bash
npm run dev
```

---

# 📸 Screens

- Home Page
- Login
- Register
- Email Verification
- Forgot Password
- OTP Verification
- Reset Password
- Product Details
- Shopping Cart
- Admin Dashboard
- Create Product
- Update Product

---

# 🔑 Authentication Flow

```text
Register
      │
      ▼
Verification Email
      │
      ▼
Verify Account
      │
      ▼
Login
      │
      ▼
JWT + HttpOnly Cookie
      │
      ▼
Protected Routes
      │
      ▼
Logout
```

---

# 🔄 Forgot Password Flow

```text
Forgot Password
       │
       ▼
Enter Email
       │
       ▼
Receive OTP
       │
       ▼
Verify OTP
       │
       ▼
Create New Password
```

---

# 📦 API Modules

## Authentication

- Register
- Login
- Logout
- Verify Email
- Forgot Password
- Verify OTP
- Reset Password

---

## Products

- Get All Products
- Get Product
- Create Product
- Update Product
- Delete Product

---

# 💻 Future Improvements

- Wishlist
- Product Reviews
- Payment Gateway (Stripe/Razorpay)
- Orders
- Order Tracking
- Coupons
- Admin Analytics
- User Profile
- Multiple Product Images
- Dark Mode

---

# 🤝 Contributing

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature/NewFeature
```

3. Commit changes

```bash
git commit -m "Added New Feature"
```

4. Push

```bash
git push origin feature/NewFeature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

**Shailendra Kumar Sahu**

📧 Email: shailendra2130@gmail.com

💼 LinkedIn:
https://www.linkedin.com/in/shailendra-sahu-186468220

🐙 GitHub:
https://github.com/Eng-Shailendra

---

## ⭐ Support

If you like this project, don't forget to ⭐ star the repository.
