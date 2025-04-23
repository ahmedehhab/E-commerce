# Health and Fitness App Backend

This is the backend for a health and fitness application built with Node.js and Express. The API handles user authentication, product management, cart functionalities, order processing, payment handling, and more.

## 🚀 Tools & Technologies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB ODM for data modeling.
- **Multer**: Middleware for handling multipart/form-data (image uploads).
- **JWT**: JSON Web Token for authentication and authorization.
- **Joi**: Data validation.
- **Nodemailer**: Sending emails (for verification, password reset, etc.).
- **Paymob**: Payment gateway integration.
- **Cloudinary**: Image and video upload management.
- **Helmet**: Security middleware for setting HTTP headers.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **XSS- Clean**: Protects against cross-site scripting attacks.
- **Rate-Limit**: Middleware to limit repeated requests to public APIs.
- **Compression**: Middleware for compressing responses.

---

## 📦 API Modules

- **Auth**: User authentication and registration.
- **Brand**: Brand management.
- **Cart**: Cart management for users.
- **Category**: Product category management.
- **Coupon**: Coupon management and discounts.
- **Order**: Order management and order status.
- **Payment**: Payment processing through card and wallet.
- **Product**: CRUD operations for products.
- **User**: User management.

---
🗂️ API Endpoints
🔐 Auth API
POST /auth/signup: User signup.

GET /auth/verify/:token: Verify email with token.

POST /auth/login: User login.

POST /auth/resend-verification-link: Resend email verification link.

POST /auth/reset-password: Reset password.

POST /auth/change-password: Change password.

🏷️ Brand API
POST /brand/:categoryId: Create a brand.

GET /brand/category/:id: Get all brands with category ID.

GET /brand/:id: Get a brand by ID.

PUT /brand/:id: Update a brand.

DELETE /brand/:id: Delete a brand.

🛒 Cart API
POST /cart/: Add item to the cart.

GET /cart/: Get all cart items.

PUT /cart/delete: Delete item from the cart.

🗂️ Category API
POST /category/: Create a new category.

PUT /category/:id: Update category by ID.

DELETE /category/:id: Delete category by ID.

GET /category/: Get all categories.

GET /category/:id: Get category by ID.

🎫 Coupon API
POST /coupon/: Create a new coupon.

GET /coupon/: Get all coupons.

📦 Order API
POST /order/:productId: Create an order for a specific product.

POST /order/: Create an order from cart.

PUT /order/:id: Deliver the order.

POST /order/cancel/:id: Cancel the order.

💳 Payment API
POST /payment/card/:id: Pay with a card.

POST /payment/wallet/:id: Pay with a mobile wallet.

GET /payment/webhook: Payment status updates.

🛍️ Product API
POST /product/:categoryId/:brandId: Create a new product.

GET /product/: Get all products.

GET /product/:id: Get product by ID.

DELETE /product/:id: Delete a product by ID.

PUT /product/:id: Update a product by ID.

👤 User API
GET /user/:id: Get user details by ID.

GET /user/: Get all users.

PUT /user/:id: Update user details by ID.

PUT /user/block/:id: Block a user by ID.

to try the APIs
https://www.postman.com/science-operator-17215056/workspace/e-commerce/collection/42944348-edb6797c-3390-4493-ae81-08dac58d87c4?action=share&creator=42944348

## 🛠️ Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ahmedehhab/E-commerce.git
   cd E-commerce
