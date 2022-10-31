const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    productId: { type: mongoose.Types.ObjectId, required: true },
})

module.exports = mongoose.model("Wishlist", WishlistSchema)