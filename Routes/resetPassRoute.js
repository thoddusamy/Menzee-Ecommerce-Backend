const express = require("express")
const { ResetPassword } = require("../Controllers/resetPassController")
const router = express.Router()

router.post('/', ResetPassword)


module.exports = router