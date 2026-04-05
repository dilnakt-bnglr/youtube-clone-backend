import videoModel from "../Models/video.model.js";
import channelModel from "../Models/channel.model.js";
import commentModel from "../Models/comment.model.js";

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
            .status(200)
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
    // Sending response with video and channel details
    return res.status(200).json({ video, channelDetails, comments });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
