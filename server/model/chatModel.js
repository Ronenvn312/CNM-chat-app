const mongoose = require("mongoose");


const chatModel = mongoose.Schema(
  {
    chatName: { 
      type: String, 
      trim: true 
    },
    isGroupChat: { 
      type: Boolean, 
      default: false 
    },
    imageGroup: { 
      type: String, 
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" 
    },
    users: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Users" 
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Users" 
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;