import Job from "../models/jobModel.js";
import { jobs } from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const MONGO_URL = process.env.MONGO_URI;
main().then(() => {
  console.log('connected to db')
}).catch((err) => {
  console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
  try{
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    console.log("Data imported successfully");
  }catch(err){
    console.log(err);
  }
}

initDB();


