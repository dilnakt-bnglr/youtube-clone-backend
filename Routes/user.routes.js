import { userLogin, userRegister } from "../Controllers/user.controller.js";

// created routes for user endpoints
export const userRoutes = (app) => {
  //POST - User Registration
  app.post("/api/register", userRegister);
  // POST -User Login
  app.post("/api/login", userLogin);
};
