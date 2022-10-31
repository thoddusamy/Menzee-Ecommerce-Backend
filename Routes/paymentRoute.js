const express = require('express')
const { CheckOut, GetKey, PaymentVerification } = require('../Controllers/paymentController')
const { Authentication } = require('../Middlewares/Authenticate')
const router = express.Router()

router.get('/getkeyid', Authentication, GetKey)
router.post('/checkout', Authentication, CheckOut)
router.post('/verifypayment', Authentication, PaymentVerification)

module.exports = router