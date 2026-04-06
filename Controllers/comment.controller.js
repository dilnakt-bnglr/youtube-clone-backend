import commentModel from "../Models/comment.model.js";

export async function addComment(req, res) {
  try {
    const { user } = req; // getting the user details from request

    const { videoId, comment } = req.body; // // Getting the comment details from request body

    // Creating comment with the provided details
    const userComment = await commentModel.create({
      videoId: videoId,
      userId: user.userId,
      userName: user.userName,
      comment: comment,
    });

    // Saving the comment to the database and sending an appropriate response based on the success or failure of the operation
    userComment
      .save()
      .then((comment) => {
        return res.status(200).json({ comment });
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to add comment" });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteCommentById(req, res) {
  try {
    const commentId = req.params.id; // Get the comment id from request params
    // Checking if comment with the id exists or not
    const comment = await commentModel.findById(commentId);
    // Error handling if comment not found
    if (!comment) {
      return res.status(400).json({ message: "No comment found" });
    }
    // Getting comment to delete by id and deleting
    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    // Sending an appropriate response based on the success
    return res.status(200).json({ deletedComment });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateCommentById(req, res) {
  try {
    const commentId = req.params.id; // Get the comment id from request params
    const { comment } = req.body; // Get the updated comment from request body

    // Checking if the comment with the id exists or not
    const commentToUpdate = await commentModel.findById(commentId);
    // Error handling if comment not found
    if (!commentToUpdate) {
      return res.status(400).json({ message: "No comment found" });
    }
    // Finding the comment to update by id and updating to new comment
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      { comment: comment },
      { new: true },
    );
    // Sending appropriate response based on the success
    return res.status(200).json({ updatedComment });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
