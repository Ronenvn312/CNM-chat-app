const router = require('express').Router()
const { register, login, getAllUsers,verify, getOneUserByEmail, resendEmail, allUsers, getUser } = require('../controllers/userController')
const { sendMessage, allMessages } = require('../controllers/messageControllers')
const { accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup } = require('../controllers/chatControllers')
const { senEmailVerify } = require('../utils/email')


router.post("/register", register)
router.post("/login", login)
router.get("/users", getAllUsers)
router.get("/user",getOneUserByEmail)
router.get("/sentEmail", senEmailVerify )
router.get("/search", allUsers )
router.put("/verify-email",verify)
router.put("/resendEmail",resendEmail)
router.get("/getUser",getUser)

module.exports = router