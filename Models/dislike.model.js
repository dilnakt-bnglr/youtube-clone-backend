import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true },
});

const dislikeModel = mongoose.model("dislike", dislikeSchema);

export default dislikeModel;
