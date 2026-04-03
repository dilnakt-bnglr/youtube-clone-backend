import { addVideo, getVideos } from "../Controllers/video.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created routes for video endpoints
export const videoRoutes = (app) => {
  // POST- Adding Video
  app.post("/api/video", authenticateUser, addVideo);
  // GET- Fetching all videos
  app.get("/api/videos", getVideos);
  // GET - Fetching video details by Id
  app.get("/api/video/:id");
};
