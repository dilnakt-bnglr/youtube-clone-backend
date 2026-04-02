import videoModel from "../Models/video.model.js";

export async function addVideo(req, res) {
  try {
    const { channelId, title, videoURL, thumbnailURL, description } = req.body; // Getting the video details from request body

    // Creating video with the provided details
    const video = await videoModel.create({
      channelId,
      title,
      videoURL,
      thumbnailURL,
      description,
    });

    // // Saving the video to the database and sending an appropriate response based on the success or failure of the operation
    video
      .save()
      .then((video) => {
        if (video) {
          return res
            .status(200)
            .json({ message: "Video Uploaded Successfully" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to Upload Video" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
