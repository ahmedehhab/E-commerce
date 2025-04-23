import mongoose from "mongoose";
import slugify from "slugify";

const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:50,
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true
    },
   image:{
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true, unique: true }
   },
   folderId:{
    type:String,
    required:true,
    unique:true
   },
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   }
   
},{timestamps:true});


CategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
      this.slug = slugify(this.name, { lower: true });
    }
    next();
  });

const categoryModel=mongoose.model('category',CategorySchema);

export default categoryModel;