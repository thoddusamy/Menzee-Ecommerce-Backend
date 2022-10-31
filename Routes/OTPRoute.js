const express = require("express")
const { verifyOTP, RemoveOTP } = require("../Controllers/OTPController")
const router = express.Router()

router.post('/', verifyOTP)
router.delete('/:email', RemoveOTP)


module.exports = router