import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config({ path: "../../.env" });


const setPasswords = async () => {
    //  console.log("Connecting to database...", process.env.MONGO_URI);
  try {                              

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");

    const users = await User.find();

    for (const user of users) {
      await user.setPassword("Test@123");
      await user.save();
      console.log(`Password set for ${user.email}`);
    }

    console.log("✅ All passwords updated.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

setPasswords();