import mongoose from "mongoose";




const CartSchema =new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            finalPrice:{
                type:Number,
                required:true
            },
            outOfStock:{
                type:Boolean,
                default:0
            }

        }
    ],

    subTotalPrice:{
        type:Number,
        default:0
    }

},{timestamps:true});

CartSchema.pre('save',function (next){
    if(this.isModified('products')){
        this.subTotalPrice = this.products.reduce((total,product)=>{
            return total + product.finalPrice;
        },0);
    }
    next();
})
    


const cartModel= mongoose.model('cart',CartSchema);

export default cartModel;