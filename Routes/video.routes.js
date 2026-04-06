import {
  addVideo,
  deleteVideoById,
  getVideoById,
  getVideos,
  updateVideoById,
} from "../Controllers/video.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

// created routes for video endpoints
export const videoRoutes = (app) => {
  // POST- Adding Video
  app.post("/api/video", authenticateUser, addVideo);
  // GET- Fetching all videos
  app.get("/api/videos", getVideos);
  // GET - Fetching video details by Id
  app.get("/api/video/:id", getVideoById);
  // DELETE - Deleting video by Id
  app.delete("/api/video/:id", authenticateUser, deleteVideoById);
  // PUT - Updating video details by Id
  app.put("/api/video/:id", authenticateUser, updateVideoById);
};
