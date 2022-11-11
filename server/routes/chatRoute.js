const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup, 
    getAllMemberInChatGroup} = require('../controllers/chatControllers')
const router = require('express').Router()



// chat
router.post("/accessChat", accessChat)
router.get("/group", fetchChats)
// router.get("/group", getAllMemberInChatGroup)
router.post("/createGroupChat", createGroupChat)
router.put("/renameGroup", renameGroup)
router.put("/addToGroup", addToGroup)
router.put("/removeFromGroup", removeFromGroup)

module.exports = router