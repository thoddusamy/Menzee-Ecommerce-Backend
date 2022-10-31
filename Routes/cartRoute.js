const express = require("express")
const {
    AddToCart,
    FetchCartItems,
    DeleteSingleCartItem,
    DeleteALlCartItems,
} = require('../Controllers/cartController')
const { Authentication } = require("../Middlewares/Authenticate")
const router = express.Router()

router.get('/cartitems', Authentication, FetchCartItems)
router.post('/', Authentication, AddToCart)
router.delete('/removeitem/:id', Authentication, DeleteSingleCartItem)
router.delete('/cleancart', Authentication, DeleteALlCartItems)

module.exports = router