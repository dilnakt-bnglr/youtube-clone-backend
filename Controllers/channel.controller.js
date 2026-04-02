import channelModel from "../Models/channel.model.js";

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
