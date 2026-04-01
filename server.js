import express from "express";
import { dbConnect } from "./dbConnection.js";
// Creating an express server
const app = new express();

dbConnect(); // Establishing the db connection

// Allocation port 3000 to the server
app.listen(5000, () => {
  console.log("Server is connected to port 5000");
});
