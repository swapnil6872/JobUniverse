import mongoose from "mongoose";

const dbUrl = process.env.MONGO_URI ;

// const dbUrl = "mongodb://127.0.0.1:27017/JobUniverse";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connected successfully", mongoose.connection.name);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
