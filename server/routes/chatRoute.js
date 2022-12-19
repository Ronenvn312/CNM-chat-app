const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup, 
    deleteGroup} = require('../controllers/chatControllers')
const router = require('express').Router()



// chat
router.post("/accessChat", accessChat)
router.get("/groups", fetchChats) /** Get All Group Of A User **/
router.post("/createGroupChat", createGroupChat)
router.delete("/group", deleteGroup)
router.put("/renameGroup", renameGroup)
router.put("/addToGroup", addToGroup)
router.put("/removeFromGroup", removeFromGroup)
router.delete("/deleteGroup", deleteGroup)
module.exports = router