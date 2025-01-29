import Message from "../models/message.model.js";

export async function getMessage(req, res) {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function sendMessage(req, res) {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { msg } = req.body;
    const message = await Message.create({
      senderId,
      receiverId,
      message: msg,
    });
    // send realtime message to the receiver
    return res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
