import mongoose from "mongoose";


async function connectDb() {
    await mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("MongoDB connected");
      }).catch((err) => {
        console.log("MongoDB connection error: ", err);
      }); 
}

export default connectDb;