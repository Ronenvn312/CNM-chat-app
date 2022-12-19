const mongoose = require("mongoose")

const groupMessageSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true
        },
        message: {
            type: String,
            require: true
        },
        time: {
            type: String,
            default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            require: true
        }
    }
)

module.exports = mongoose.model("groupMessage", groupMessageSchema)