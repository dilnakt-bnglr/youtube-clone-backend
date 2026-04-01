import express from "express";
import { dbConnect } from "./dbConnection.js";
import { userRoutes } from "./Routes/user.routes.js";
// Creating an express server
const app = new express();

dbConnect(); // Establishing the db connection

app.use(express.json()); // Middleware to parse JSON data from the request body

// Allocating port 5000 to the server
app.listen(5000, () => {
  console.log("Server is connected to port 5000");
});

userRoutes(app);
