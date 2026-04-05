import {
  addComment,
  deleteCommentById,
} from "../Controllers/comment.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

export const commentRoutes = (app) => {
  // POST - Add Comment
  app.post("/api/comment", authenticateUser, addComment);
  // DELETE - Delete comment by id
  app.delete("/api/comment/:id", authenticateUser, deleteCommentById);
};
