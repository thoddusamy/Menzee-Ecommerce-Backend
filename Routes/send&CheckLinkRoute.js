const express = require("express")
const { SendResetLink, CheckURL } = require("../Controllers/Send&CheckLinkController")
const router = express.Router()

router.post('/', SendResetLink)
router.post('/checkurl', CheckURL)


module.exports = router