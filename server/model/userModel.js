const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    last_login: { type: Date }
    ,
    verifyed: {
        type: Boolean,
        default: false
    },
    token: { type: String }
})

module.exports = mongoose.model("Users", userSchema)