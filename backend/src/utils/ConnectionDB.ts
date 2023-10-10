import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to database");
  } catch (error) {
    console.log("Connection to database failed", error);
  }
}
export default connectToDatabase;
