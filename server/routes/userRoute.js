const { register, login, getAllUsers, getUserByID } = require('../controllers/userController')
const { sendMessage, allMessages} = require('../controllers/messageControllers')
const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup } = require('../controllers/chatControllers')
const router = require('express').Router()

router.post("/register", register)
router.post("/login", login)
router.get("/users", getAllUsers)
// router.get("/friends",getFriends)
// router.get("/add-friend",addFriends)
router.get("/get-user", getUserByID)


// // chat
// router.post("/accessChat", accessChat)
// router.get("/fetchChats", fetchChats)
// router.post("/createGroupChat", createGroupChat)
// router.put("/renameGroup", renameGroup)
// router.put("/addToGroup", addToGroup)
// router.put("/removeFromGroup", removeFromGroup)
// //message 
// router.post("/sendMessage", sendMessage)
// router.get("/getMessage", allMessages)
module.exports = router