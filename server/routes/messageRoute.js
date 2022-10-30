const { sendMessage, allMessages} = require('../controllers/messageControllers')
const router = require('express').Router()
//message 
router.post("/sendMessage", sendMessage)
router.get("/getMessage", allMessages)
module.exports = router