import dislikeModel from "../Models/dislike.model.js";
import likeModel from "../Models/like.model.js";
import videoModel from "../Models/video.model.js";

// Adiing user like and dislike
export async function addUserLikeDislike(req, res) {
  try {
    const userAction = req.params.action; // Getting the action (like/dislike) from the request parameters
    const { user } = req; // getting the user details from request

    const { videoId } = req.body; // Getting the video id from request body

    // Checking if video exists or not
    const videoToLikeDislike = await videoModel.findById(videoId);
    // error handling if video not found
    if (!videoToLikeDislike) {
      return res.status(400).json({ message: "No video found" });
    }
    // Adding like/dislike based on the user action and sending an appropriate response based on the success of the operation
    if (userAction === "like") {
      // Getting the existinglike for the video
      const existingLike = await likeModel.findOne({
        userId: user.userId,
        videoId,
      });
      // Checking if existing like there or not and if found then deleting if from db
      if (existingLike) {
        await likeModel.findByIdAndDelete(existingLike._id);
        // Getting all the likes using videoid
        const totalLikes = await likeModel.find({ videoId });
        // Sending appropriate response
        return res
          .status(200)
          .json({ message: "Like removed", totalLikes, isUserLiked: false });
      }

      // Checking if dislike already exists and delete
      await dislikeModel.findOneAndDelete({
        videoId,
        userId: user.userId,
      });

      // Adding like to video
      await likeModel.create({
        userId: user.userId,
        videoId,
      });
      // getting the total likes for video
      const totalLikes = await likeModel.find({ videoId });
      // Sending appropriate response
      return res
        .status(201)
        .json({ totalLikes, isUserLiked: true, isUserDisliked: false });
    }

    //  Adding like/dislike based on the user action and sending an appropriate response based on the success of the operation
    if (userAction === "dislike") {
      // Getting the existingdislike for the video
      const existingDisLike = await dislikeModel.findOne({
        userId: user.userId,
        videoId,
      });
      // Checking if existing dislike there or not and if found then deleting if from db
      if (existingDisLike) {
        await dislikeModel.findByIdAndDelete(existingDisLike?._id);
        // Sending appropriate response
        return res
          .status(200)
          .json({ message: "Dislike removed", isUserDisliked: false });
      }
      // Checking if like already exists and delete it
      await likeModel.findOneAndDelete({
        videoId,
        userId: user.userId,
      });
      // Adding dislike to video
      await dislikeModel.create({
        userId: user.userId,
        videoId,
      });
      // getting the total likes for video
      const totalLikes = await likeModel.find({ videoId });
      // Sending appropriate response
      return res
        .status(201)
        .json({ isUserDisliked: true, isUserLiked: false, totalLikes });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
