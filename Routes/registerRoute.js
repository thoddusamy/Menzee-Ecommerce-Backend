const express = require("express")
const router = express.Router()
const { RegisterUser } = require("../Controllers/registerController")

router.post("/", RegisterUser)



module.exports = router