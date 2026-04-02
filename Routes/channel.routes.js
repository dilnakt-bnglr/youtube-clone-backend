import { createChannel } from "../Controllers/channel.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created routes for channel endpoints
export const channelRoutes = (app) => {
  // POST- Channel Creation
  app.post("/api/channel", authenticateUser, createChannel);
};
