import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI; // Get Mongo URI from environment variables
    const dbName = process.env.MONGODB_DBNAME || "books"; // Target DB name
    if (!uri) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(uri, {
      // In Mongoose 8 these legacy flags are ignored, but harmless for older setups
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName,
      serverSelectionTimeoutMS: 30000,
    });

    console.log(`MongoDB connected successfully (db: ${dbName})`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
