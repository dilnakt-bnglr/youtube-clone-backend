import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true },
});

// Create a comment model based on the defined schema
const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
