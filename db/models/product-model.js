import mongoose from "mongoose";
import slugify from "slugify"; 

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    images:[{
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true }
    }],
    folderId: { type: String, required: true, unique: true },
    description: { type: String, required: true, trim: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalPrice: { type: Number },
    stock: { type: Number, default: 0,required:true },
    rating: { type: Number, default: 0 },

    specifications: { type: Map, of: [String ] },
}, { timestamps: true });


ProductSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }

    if (this.isModified('price') || this.isModified('discount')) {
        const discountAmount = (this.discount / 100) * this.price;
        this.finalPrice = +(this.price - discountAmount).toFixed(2); 
    }

    next();
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
