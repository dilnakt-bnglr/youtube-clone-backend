import { addComment } from "../Controllers/comment.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

export const commentRoutes = (app) => {
  // POST - Add Comment
  app.post("/api/comment", authenticateUser, addComment);
};
