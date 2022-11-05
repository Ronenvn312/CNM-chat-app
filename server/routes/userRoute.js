const { register, login, getAllUsers, getUserByID, verify } = require('../controllers/userController')
const { sendMessage, allMessages} = require('../controllers/messageControllers')
const { senEmailVerify} = require('../utils/email')
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
router.get("/sentEmail", senEmailVerify )
router.get("/verify-email",verify)
module.exports = router