const express = require("express")
const router = express.Router()
const { Login } = require("../Controllers/loginController")

router.post("/", Login)

module.exports = router