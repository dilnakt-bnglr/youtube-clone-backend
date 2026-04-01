import { userRegister } from "../Controllers/user.controller.js";

export const userRoutes = (app) => {
  //POST - User Registration
  app.post("/api/register", userRegister);
};
