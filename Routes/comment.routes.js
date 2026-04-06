import {
  addComment,
  deleteCommentById,
  updateCommentById,
} from "../Controllers/comment.controller.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

export const commentRoutes = (app) => {
  // POST - Add Comment
  app.post("/api/comment", authenticateUser, addComment);
  // DELETE - Delete comment by id
  app.delete("/api/comment/:id", authenticateUser, deleteCommentById);
  // PUT - Update comment by id
  app.put("/api/comment/:id", authenticateUser, updateCommentById);
};
