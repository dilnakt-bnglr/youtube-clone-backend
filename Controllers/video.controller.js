import videoModel from "../Models/video.model.js";
import channelModel from "../Models/channel.model.js";
import commentModel from "../Models/comment.model.js";
import likeModel from "../Models/like.model.js";
import dislikeModel from "../Models/dislike.model.js";

// Adding video
export async function addVideo(req, res) {
  try {
    const { channelId, title, videoURL, thumbnailURL, category, description } =
      req.body; // Getting the video details from request body

    // Creating video with the provided details
    const video = await videoModel.create({
      channelId,
      title,
      videoURL,
      thumbnailURL,
      category,
      description,
    });

    // // Saving the video to the database and sending an appropriate response based on the success or failure of the operation
    video
      .save()
      .then((video) => {
        if (video) {
          return res
            .status(201)
            .json({ message: "Video Uploaded Successfully", video });
        }
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to Upload Video" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetching the all videos
export async function getVideos(req, res) {
  try {
    let videos = await videoModel.find(); // Getting all the videos
    // Sending an appropriate response if video doesn't exist
    if (!videos) {
      return res.status(400).json({ message: "Failed to fetch videos" });
    }

    // Fetch channel details for each video
    const videosWithChannelName = await Promise.all(
      videos.map(async (video) => {
        const channelDetails = await channelModel.findById(video.channelId);
        return {
          ...video.toObject(),
          channelName: channelDetails?.channelName || "Unknown",
        };
      }),
    );
    // sending response with video details
    return res.status(200).json({ videos: videosWithChannelName });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetching Video by Id
export async function getVideoById(req, res) {
  try {
    const videoId = req.params.id; // Get the video id from request params
    // Checking if the video with the id exists
    const video = await videoModel.findById(videoId);
    // Checking if videos exists and sending appropriate response for failed operation
    if (!video) {
      return res.status(400).json({ message: "Failed to fetch video" });
    }
    // getting channel id from video details
    const { channelId } = video;
    // Finding the channel with channelId
    const channelDetails = await channelModel.findById(channelId);
    // Fetching the video comments
    const comments = await commentModel.find({ videoId });
    const videoLikes = await likeModel.find({ videoId });
    const videoDisLikes = await dislikeModel.find({ videoId });
    // Sending response with video and channel details
    return res
      .status(200)
      .json({ video, channelDetails, comments, videoLikes, videoDisLikes });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Deleting video by Id
export async function deleteVideoById(req, res) {
  try {
    const videoId = req.params.id; // Get the video id from request params
    // Checking if the video with the id exists
    const video = await videoModel.findById(videoId);
    // Error handling if video not found
    if (!video) {
      return res.status(400).json({ message: "No video found" });
    }
    // Deleting the video by id
    const deletedVideo = await videoModel.findByIdAndDelete(videoId);
    // Sending an appropriate response based on the success or failure of the operation
    return res.status(200).json({ deletedVideo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Updating video by Id
export async function updateVideoById(req, res) {
  try {
    const videoId = req.params.id; // Get the video id from request params
    const { title, videoURL, thumbnailURL, category, description } = req.body; // Get the updated video details from request body

    // Checking if the video with the id exists
    const videoToUpdate = await videoModel.findById(videoId);
    // Error handling if video not found
    if (!videoToUpdate) {
      return res.status(400).json({ message: "No video found" });
    }
    // Finding the video to update by id and updating with new details
    const updatedVideo = await videoModel.findByIdAndUpdate(
      videoId,
      { title, videoURL, thumbnailURL, category, description },
      { new: true },
    );
    // Sending appropriate response based on the success
    return res.status(200).json({ updatedVideo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
