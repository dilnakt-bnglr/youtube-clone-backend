import {
  createChannel,
  getChannelById,
  getUserChannelList,
} from "../Controllers/channel.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created routes for channel endpoints
export const channelRoutes = (app) => {
  // POST- Channel Creation
  app.post("/api/channel", authenticateUser, createChannel);
  // GET- Get Channel Details
  app.get("/api/channel/:id", getChannelById);
  // GET- Get User Channel List
  app.get("/api/channel-list", authenticateUser, getUserChannelList);
};
