import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

// Connecting to MongoDB using mongoose
export const dbConnect = () => {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log("Error while connecting to database", error);
    });
};
