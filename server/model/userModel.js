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
    
    pic: {
        type: String,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        required: true
    },
    // phone: {
    //     type: String,
    //     default: ""
    // },
    // last_login: { type: Date }
    // ,
    isVerified: {
        type: Boolean,
        default: false
    },
    token: { type: String }
})

module.exports = mongoose.model("Users", userSchema)