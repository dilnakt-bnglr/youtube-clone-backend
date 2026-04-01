import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email address is required"],
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: [true, "Password is required"] },
});

// Create a user model based on the defined schema
const userModel = mongoose.model("user", userSchema);

export default userModel;
