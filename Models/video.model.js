import mongoose from "mongoose";

// Define the video schema
const videoSchema = new mongoose.Schema({
  channelId: { type: String, required: true },
  title: { type: String, required: true },
  videoURL: { type: String, required: true },
  thumbnailURL: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

// Create a video model based on the defined schema
const videoModel = mongoose.model("video", videoSchema);

export default videoModel;
