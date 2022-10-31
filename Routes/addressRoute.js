const express = require("express")
const { SaveAddress, FetchAddressByUserId, UpdateAddress } = require("../Controllers/addressController")
const { Authentication } = require("../Middlewares/Authenticate")
const router = express.Router()

router.get('/', Authentication, FetchAddressByUserId)
router.post('/', Authentication, SaveAddress)
router.post('/updateaddress', Authentication, UpdateAddress)

module.exports = router