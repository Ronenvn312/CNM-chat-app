const router = require('express').Router()
const { register, login, getAllUsers, getOneUserByEmail } = require('../controllers/userController')
const { sendMessage, allMessages } = require('../controllers/messageControllers')
const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup } = require('../controllers/chatControllers')


router.post("/register", register)
router.post("/login", login)
router.get("/users", getAllUsers)
router.get("/users/:email",getOneUserByEmail)


// // chat

// //message 

module.exports = router