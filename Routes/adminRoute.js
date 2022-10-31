const express = require("express")
const { GetAdminDetails, AdminLogin } = require("../Controllers/adminController")
const router = express.Router()
const { Authentication } = require('../Middlewares/Authenticate')

router.get('/', Authentication, GetAdminDetails)
router.post("/", AdminLogin)

module.exports = router