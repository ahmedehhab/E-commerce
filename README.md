# 🏋️‍♂️ Health and Fitness App Backend

A comprehensive backend API for a health and fitness application built with Node.js and Express. This API provides robust functionality for user management, product catalogs, shopping carts, order processing, secure payments, and more.

[![Node.js](https://img.shields.io/badge/Node.js-v16.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.x-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- **User Authentication & Authorization**: Secure JWT-based authentication system
- **Product Management**: Comprehensive CRUD operations with categories and brands
- **Shopping Cart**: Full cart functionality with product tracking
- **Order Processing**: Complete order lifecycle management
- **Payment Integration**: Multiple payment method support (cards, wallets)
- **Image Handling**: Cloud-based image storage and management
- **Security**: Protection against common web vulnerabilities
- **Email Communications**: Automated emails for account verification and password resets

## 🚀 Tech Stack

### Core
- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment
- **[Express](https://expressjs.com/)**: Fast, minimalist web framework for Node.js
- **[MongoDB](https://www.mongodb.com/)**: NoSQL database
- **[Mongoose](https://mongoosejs.com/)**: MongoDB object modeling for Node.js

### Authentication & Security
- **[JWT](https://jwt.io/)**: JSON Web Tokens for secure authentication
- **[Helmet](https://helmetjs.github.io/)**: Security middleware for HTTP headers
- **[CORS](https://www.npmjs.com/package/cors)**: Cross-Origin Resource Sharing middleware
- **[XSS-Clean](https://www.npmjs.com/package/xss-clean)**: Protection against XSS attacks
- **[Rate-Limit](https://www.npmjs.com/package/express-rate-limit)**: Request limiter for API endpoints

### Files & Data
- **[Multer](https://www.npmjs.com/package/multer)**: Middleware for handling multipart/form-data
- **[Cloudinary](https://cloudinary.com/)**: Cloud storage for images and videos
- **[Joi](https://joi.dev/)**: Schema validation library

### Communications & Payments
- **[Nodemailer](https://nodemailer.com/)**: Email sending functionality
- **[Paymob](https://paymob.com/)**: Payment gateway integration

### Performance
- **[Compression](https://www.npmjs.com/package/compression)**: Response compression middleware

## 📂 API Structure

The API is organized into logical modules:
src/
├── auth/       # Authentication & user registration
├── brand/      # Brand management
├── cart/       # Shopping cart functionality
├── category/   # Product categories
├── coupon/     # Discount coupons
├── order/      # Order processing & management
├── payment/    # Payment processing
├── product/    # Product CRUD operations
└── user/       # User management

## 🔍 API Endpoints

### 🔐 Auth API
- `POST /auth/signup` - Register a new user
- `GET /auth/verify/:token` - Verify email with token
- `POST /auth/login` - User login
- `POST /auth/resend-verification-link` - Resend email verification
- `POST /auth/reset-password` - Reset forgotten password
- `POST /auth/change-password` - Change existing password

### 🏷️ Brand API
- `POST /brand/:categoryId` - Create a new brand
- `GET /brand/category/:id` - Get all brands by category
- `GET /brand/:id` - Get specific brand details
- `PUT /brand/:id` - Update brand information
- `DELETE /brand/:id` - Remove a brand

### 🛒 Cart API
- `POST /cart/` - Add item to cart
- `GET /cart/` - View cart contents
- `PUT /cart/delete` - Remove item from cart

### 🗂️ Category API
- `POST /category/` - Create product category
- `PUT /category/:id` - Update category
- `DELETE /category/:id` - Remove category
- `GET /category/` - List all categories
- `GET /category/:id` - Get category details

### 🎫 Coupon API
- `POST /coupon/` - Create discount coupon
- `GET /coupon/` - List all coupons

### 📦 Order API
- `POST /order/:productId` - Create order for specific product
- `POST /order/` - Create order from cart items
- `PUT /order/:id` - Mark order as delivered
- `POST /order/cancel/:id` - Cancel existing order

### 💳 Payment API
- `POST /payment/card/:id` - Process card payment
- `POST /payment/wallet/:id` - Process mobile wallet payment
- `GET /payment/webhook` - Handle payment status updates

### 🛍️ Product API
- `POST /product/:categoryId/:brandId` - Create new product
- `GET /product/` - List all products
- `GET /product/:id` - Get product details
- `DELETE /product/:id` - Remove product
- `PUT /product/:id` - Update product information

### 👤 User API
- `GET /user/:id` - Get user profile
- `GET /user/` - List all users (admin)
- `PUT /user/:id` - Update user information
- `PUT /user/block/:id` - Block user account

🧪 Testing API Endpoints
You can test all API endpoints using our Postman collection:
Open Postman Collection
📊 Database Schema
Our MongoDB schema is organized into the following main collections:

Users
Products
Categories
Brands
Carts
Orders
Coupons

🛡️ Security Features

JWT-based authentication
Password hashing
Request rate limiting
XSS protection
Secure HTTP headers
Input validation
