const groupMessage = require("../model/groupMessageModel")

module.exports.saveMessage = async (req, res, next) => {
    const { room, author, message, time } = req.body
    const mess = new groupMessage({
        room,
        author,
        message,
        time
    })
    console.log(mess)

    try {
        const newGrMessage = await groupMessage.create(mess)
        res.status(201).json(newGrMessage)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports.getAllMessOfGroup = async (req, res, next) => {
    try {
        const messList = await groupMessage.find({ room: req.query.room})
        res.status(201).json(messList)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}