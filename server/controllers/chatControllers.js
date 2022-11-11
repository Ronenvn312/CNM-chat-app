const asyncHandler = require("express-async-handler");
const Chat = require("../model/chatModel");
const User = require("../model/userModel");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
module.exports.accessChat = async (req, res) => {
  const { user, userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })


  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id })
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
};

//@description     Fetch all chats for a user
//@route           GET /api/chat/group?user_id=""
//@access          Protected
module.exports.fetchChats = async (req, res, next) => {
  try {
    await Chat.find({ users: { $elemMatch: { $eq: req.query.user_id } } })
    .populate("users").exec((err, docs) => {
      res.json(docs)
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
};


//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
//http://localhost:5000/api/auth/createGroupChat
module.exports.createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var { users } = req.body;

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }
  //them người tạo froup vào danh sách users
  users.push(req.body.user._id);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.body.user._id,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected 
//http://localhost:5000/api/auth/renameGroup
module.exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
};

// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
module.exports.removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
};

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
module.exports.addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
};


