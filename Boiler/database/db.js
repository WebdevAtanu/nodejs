import mongoose from "mongoose";

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017"; // fallback in case env is not set
const database = "admin";

const databaseConnection = async () => {
  try {
    await mongoose.connect(`${dbUrl}/${database}`);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

export default databaseConnection;
