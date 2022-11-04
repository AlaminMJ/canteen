import mongoose from "mongoose";
import { DB_URL } from "../config";
const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL, { dbName: "canteen" });
    console.log("database connect successfully");
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
