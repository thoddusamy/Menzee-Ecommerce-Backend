const Products = require('../Schema/productSchema')
const Wishlist = require('../Schema/wishlistSchema')

const AddWishlist = async (req, res) => {
    try {
        const { id } = req.body
        const getProduct = await Products.findOne({ _id: id })
        if (getProduct) {
            const addToWishlist = await Wishlist.create({ items: [getProduct], userId: req.userId, productId: id })
            if (addToWishlist) {
                res.status(200).json({ message: 'Added to wishlist' })
            } else {
                res.status(400).json({ message: 'Added to wishlist failed' })
            }
        } else {
            res.status(400).json({ message: 'Product not found - wishlist error' })
        }
    } catch (error) {
        console.log(error);
    }
}

const RemoveWishlist = async (req, res) => {
    try {
        let { id } = req.params
        const removeWishlistItem = await Wishlist.deleteOne({ productId: id, userId: req.userId })
        if (removeWishlistItem) {
            res.status(200).json({ message: "Removed from wishlist" })
        } else {
            res.status(400).json({ message: "Removed from wishlist Error" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Removed from wishlist Error" })
    }
}

const FetchWishlistItems = async (req, res) => {
    try {
        const fetchwishlist = await Wishlist.find({ userId: req.userId })
        if (fetchwishlist) {
            res.status(200).json(fetchwishlist)
        } else {
            res.status(400).json({ message: "fetch Wishlist items error" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "fetch Wishlist items error" })
    }
}

module.exports = { AddWishlist, FetchWishlistItems, RemoveWishlist }