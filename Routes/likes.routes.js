import { addUserLikeDislike } from "../Controllers/userLikeDislike.js";
import { authenticateUser } from "../Middlewares/authenticateUser.js";

export const likeDislikeRoutes = (app) => {
  // POST - Adding Like
  app.post("/api/user-action/:action", authenticateUser, addUserLikeDislike);
};
