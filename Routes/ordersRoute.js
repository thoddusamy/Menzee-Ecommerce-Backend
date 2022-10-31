const express = require("express")
const { CashOrder, FetchOrders, FetchAllOrders } = require("../Controllers/ordersController")
const { Authentication } = require("../Middlewares/Authenticate")
const router = express.Router()

router.get('/getorders', Authentication, FetchOrders)
router.get('/allorders', Authentication, FetchAllOrders)
router.post('/orderbyuserid', Authentication, CashOrder)

module.exports = router