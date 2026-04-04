import mongoose from "mongoose";

// Connecting to mongoDB using mongoose
export const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://dilnadevaraj98_db_user:Yk8Vx00D3HGPSgW1@youtubecluster.ipfoayv.mongodb.net/youtube",
    )
    .then(() => {
      console.log("Database is connecetd");
    })
    .catch((error) => {
      console.log("Error while connecting to database", error);
    });
};
