const asyncHandler = require("express-async-handler");
const Message = require("../model/messageModel");
const User = require("../model/userModel");
const Chat = require("../model/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
module.exports.allMessages =  async (req, res) => {

  try {
    const messages = await Message.find({ chat: req.body.chat._id })
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
module.exports.sendMessage = async (req, res, next) => {
  const { content, chatId, user } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    next(error)
  }
};