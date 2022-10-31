const express = require("express")
const router = express.Router()
const { GetUserDetails, UpdateProfilePic } = require("../Controllers/userController")
const { Authentication } = require('../Middlewares/Authenticate')

router.get('/', Authentication, GetUserDetails)
router.put('/updatepic', Authentication, UpdateProfilePic)

module.exports = router