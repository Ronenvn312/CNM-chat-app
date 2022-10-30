const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup } = require('../controllers/chatControllers')
const router = require('express').Router()



// chat
router.post("/accessChat", accessChat)
router.get("/fetchChats", fetchChats)
router.post("/createGroupChat", createGroupChat)
router.put("/renameGroup", renameGroup)
router.put("/addToGroup", addToGroup)
router.put("/removeFromGroup", removeFromGroup)

module.exports = router