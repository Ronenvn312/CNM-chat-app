const router = require("express").Router()

const { saveMessage, getAllMessOfGroup } = require("../controllers/groupMessageController")

router.post("/saveMessage", saveMessage)
router.get("/", getAllMessOfGroup)

module.exports = router