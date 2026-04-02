import { addVideo } from "../Controllers/video.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created routes for video endpoints
export const videoRoutes = (app) => {
  // Adding Video
  app.post("/api/video", authenticateUser, addVideo);
};
