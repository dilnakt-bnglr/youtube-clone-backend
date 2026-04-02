import mongoose from "mongoose";

// Define the channel Schema
const channelSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  channelName: { type: String, required: true },
  channelHandleId: { type: String, required: true },
});

// Create a channel model based on the defined schema
const channelModel = mongoose.model("channel", channelSchema);

export default channelModel;
