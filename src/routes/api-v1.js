import { Router } from "express";
import authRoute from "../auth/auth-route.js";
import userRoute from "../user/user-route.js";
import categoryRoute from "../category/category-route.js";
import brandRoute from "../brand/brand-route.js";
import productRoute from "../product/product-route.js";
import cartRoute from "../cart/cart-route.js";
import couponRoute from "../coupon/coupon-route.js";
import orderRoute from "../order/order-route.js";
import paymentRoute from "../payment/payment-route.js";
const router = Router();

router.use('/auth', authRoute);
router.use('/user',userRoute);
router.use('/category',categoryRoute);
router.use('/product',productRoute);
router.use('/brand',brandRoute);
router.use('/cart',cartRoute);
router.use('/coupon',couponRoute);
router.use('/order',orderRoute);
router.use('/payment',paymentRoute);

export default router;