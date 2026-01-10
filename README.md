🛒 E-Commerce Backend API

🌐 Live API: https://assignment-8-backend-omega.vercel.app/

🎯 Overview

This is a secure, role-based E-commerce Backend API built using Node.js, Express, TypeScript, and MongoDB.

It supports User Authentication, Product Management, Cart & Orders, Payments, Wishlist, and Reviews, with JWT-based authorization and role-based access control for Users and Admins.

🚀 Tech Stack

Node.js

Express.js

TypeScript

MongoDB + Mongoose

Zod (Request validation)

JWT Authentication

bcrypt (Password hashing)

Multer (Image upload)

SSLCommerz (Payment Gateway Integration)

⚙️ Setup & Installation
1️⃣ Clone the Repository
git clone https://github.com/Hamim-1/Assignment-8-backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
cp .env.example .env

Example .env file
# Server
PORT=5000
NODE_ENV=production

# Database
DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority

# Bcrypt
BCRYPT_SALT_ROUND=10

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES=7d

# SSLCommerz Credentials
SSL_STORE_ID=your_store_id
SSL_STORE_PASS=your_store_password

# SSLCommerz API URLs
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

# SSLCommerz IPN
SSL_IPN_URL=https://your-backend-url/api/v1/payment/validate-payment

# SSLCommerz Backend Callback URLs
SSL_SUCCESS_BACKEND_URL=https://your-backend-url/api/v1/payment/success
SSL_FAIL_BACKEND_URL=https://your-backend-url/api/v1/payment/fail
SSL_CANCEL_BACKEND_URL=https://your-backend-url/api/v1/payment/cancel

# SSLCommerz Frontend Redirect URLs
SSL_SUCCESS_FRONTEND_URL=https://your-frontend-url/success
SSL_FAIL_FRONTEND_URL=https://your-frontend-url/fail
SSL_CANCEL_FRONTEND_URL=https://your-frontend-url/cancel

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4️⃣ Run the Server
npm run dev


📌 Base URL

http://localhost:5000/api/v1

👥 User Roles
Role	Description
Admin	Manage users, products, orders
User	Browse products, manage cart, place orders
🔐 Authentication
Auth Routes
Endpoint	Method	Access	Description
/api/v1/auth/login	POST	Public	Login user
/api/v1/auth/me	GET	User / Admin	Get logged-in user
/api/v1/auth/refresh-token	POST	Public	Get new access token
/api/v1/auth/logout	POST	User / Admin	Logout user

🔑 JWT is sent via Authorization header or cookies.

👤 User Management
User Routes
Endpoint	Method	Access	Description
/api/v1/users/register	POST	Public	Register new user
/api/v1/users	GET	Admin	Get all users
/api/v1/users/:id/status	PATCH	Admin	Block / Unblock user
/api/v1/users/wishlist	GET	User	Get wishlist
/api/v1/users/wishlist/:id	POST	User	Add product to wishlist
/api/v1/users/wishlist/:id	DELETE	User	Remove product from wishlist
📦 Product Management
Product Routes
Endpoint	Method	Access	Description
/api/v1/products	GET	Public	Get all products
/api/v1/products/:id	GET	Public	Get single product
/api/v1/products	POST	Admin	Add new product
/api/v1/products/:id	PATCH	Admin	Update product
/api/v1/products/:id	DELETE	Admin	Delete product

📌 Product image upload handled using Multer.

🛒 Cart Management
Cart Routes
Endpoint	Method	Access	Description
/api/v1/carts	POST	User	Add product to cart
/api/v1/carts	GET	User	Get user cart
/api/v1/carts/:id	DELETE	User	Remove cart item
/api/v1/carts/clear	DELETE	User	Clear cart
📦 Order Management
Order Routes
Endpoint	Method	Access	Description
/api/v1/orders	POST	User / Admin	Create order
/api/v1/orders	GET	Admin	Get all orders
/api/v1/orders/history	GET	User	Get order history
💳 Payment Integration
Payment Routes
Endpoint	Method	Description
/api/v1/payment/success	POST	Payment success callback
/api/v1/payment/fail	POST	Payment failure callback
/api/v1/payment/cancel	POST	Payment cancel callback
/api/v1/payment/validate-payment	POST	Validate payment
⭐ Review System
Review Routes
Endpoint	Method	Access	Description
/api/v1/reviews	POST	User	Add review
/api/v1/reviews/:id	DELETE	User / Admin	Delete review
/api/v1/reviews/product/:id	GET	Public	Get product reviews
✅ Security & Validation

Passwords hashed using bcrypt

Input validation with Zod

JWT-based authentication

Role-based authorization

Admin-only protected routes

Secure payment verification

📌 Project Structure
src/
├── modules/
│   ├── auth
│   ├── user
│   ├── product
│   ├── cart
│   ├── order
│   ├── payment
│   └── review
├── middlewares
├── routes
├── utils
└── app.ts
