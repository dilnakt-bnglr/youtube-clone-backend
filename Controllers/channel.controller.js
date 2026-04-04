import channelModel from "../Models/channel.model.js";
import videoModel from "../Models/video.model.js";

// Creating Channel
export async function createChannel(req, res) {
  try {
    const { user } = req; // getting the user details from request
    const { channelName, channelHandleId } = req.body; // Getting the channel details from request body

    // Checking if channel already exist or not
    let channelExist = await channelModel.findOne({
      $and: [{ userId: user.userId }, { channelName }],
    });
    if (channelExist) {
      return res
        .status(400)
        .json({ message: `Channel with name ${channelName} already exist ` });
    }

    // Creating channel with the provided details
    const channel = await channelModel.create({
      userId: user.userId,
      channelName: channelName,
      channelHandleId: channelHandleId,
    });

    // Saving the channel to the database and sending an appropriate response based on the success or failure of the operation
    channel
      .save()
      .then((channel) => {
        if (channel) {
          return res.status(200).json({
            message: "Channel created successfully",
            channelId: channel._id,
          });
        }
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ message: "Failed to create channel" } || error);
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetching the channel details
export async function getChannelById(req, res) {
  try {
    const channelId = req.params.id; // Get the channel id from request params
    // Checking if the channel with the id exists
    let channel = await channelModel.findById(channelId);
    let videos;
    // Checking if videos are there in the channel else sending appropriate response for failed operation
    if (channel) {
      videos = await videoModel.find({ channelId });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to fetch Channel Details" });
    }

    // Sending an appropriate response based on the success
    return res.status(200).json({ channelDetails: channel, videos });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserChannelList(req, res) {
  try {
    const { user } = req; // getting the user details from request
    // Finding user channels by user id
    const userChannels = await channelModel.find({ userId: user.userId });
    // Sending an appropriate response based on success
    return res.status(200).json({ channelList: userChannels });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
