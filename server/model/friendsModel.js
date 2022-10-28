const mongoose = require('mongoose')

const friendsModel = new mongoose.Schema({
    "id_user": {
        type: Number
    },
    "friends": [
        {
            "id_room": {
                type: Number
            },
            "id_friend": {
                type: Number
            }
        }
    ]
})
module.exports = mongoose.model("friends", friendsModel)