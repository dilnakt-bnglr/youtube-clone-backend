import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
});

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;
