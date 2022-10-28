const { register, login, getAllUsers } = require('../controllers/userController')
const {getFriends, addFriends} = require('../controllers/friendsController')

const router = require('express').Router()

router.post("/register", register)
router.post("/login", login)
router.get("/users", getAllUsers)
router.get("/friends",getFriends)
router.get("/add-friend",addFriends)

module.exports = router