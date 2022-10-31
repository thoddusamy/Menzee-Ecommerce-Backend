const express = require("express")
const { AddWishlist, FetchWishlistItems, RemoveWishlist } = require("../Controllers/wishlistController")
const { Authentication } = require("../Middlewares/Authenticate")
const router = express.Router()

router.get('/getwishlistitems', Authentication, FetchWishlistItems)
router.post('/add', Authentication, AddWishlist)
router.delete('/remove/:id', Authentication, RemoveWishlist)


module.exports = router