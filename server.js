import express from "express";
import { dbConnect } from "./dbConnection.js";
import { userRoutes } from "./Routes/user.routes.js";
import { channelRoutes } from "./Routes/channel.routes.js";
import { videoRoutes } from "./Routes/video.routes.js";
import cors from "cors";

// Creating an express server
const app = new express();

app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins

dbConnect(); // Establishing the db connection

app.use(express.json()); // Middleware to parse JSON data from the request body

// Allocating port 5000 to the server
app.listen(5000, () => {
  console.log("Server is connected to port 5000");
});

userRoutes(app);
channelRoutes(app);
videoRoutes(app);
