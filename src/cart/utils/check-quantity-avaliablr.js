import productModel from "../../../db/models/product-model.js";

export const checkQuantityAvaliable = async (cart) => {
    for (const item of cart.products) {
        const product = await productModel.findById(item.productId);
        if (!product || item.quantity > product.stock) {
            item.outOfStock = true;
        } else {
            item.outOfStock = false;
        }
    }
    return cart;
};
