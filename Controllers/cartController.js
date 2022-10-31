const Cart = require('../Schema/cartSchema')


const AddToCart = async (req, res) => {
    try {
        req.body.userId = req.userId
        const addToCart = await Cart.create(req.body)
        if (addToCart) {
            res.status(200).json({ message: "Added to Bag" })
        } else {
            res.status(401).json({ message: "Addtocart Error" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Addtocart Error" })
    }
}

const FetchCartItems = async (req, res) => {
    try {
        let userId = req.userId
        let fetchCartItems = await Cart.find({ userId })
        if (fetchCartItems) {
            res.status(200).json(fetchCartItems)
        } else {
            res.status(401).json('fetchCartItems error')
        }
    } catch (error) {
        console.log(error);
        res.status(401).json('fetchCartItems error')
    }
}

const DeleteSingleCartItem = async (req, res) => {
    try {
        let { id } = req.params
        let deleteCartItem = await Cart.deleteOne({ _id: id, userId: req.userId })
        if (deleteCartItem) {
            res.status(200).json({ message: "Item removed" })
        } else {
            res.status(401).json('deleteCartItem error')
        }
    } catch (error) {
        console.log(error);
        res.status(401).json('deleteCartItem error')
    }
}

const DeleteALlCartItems = async (req, res) => {
    try {
        let cleanCart = await Cart.deleteMany({ userId: req.userId })
        if (cleanCart) {
            res.status(200).json({ message: "All CartItems removed" })
        } else {
            res.status(400).json('All CartItems removed error')
        }
    } catch (error) {
        console.log(error);
        res.status(400).json('All CartItems removed error')
    }
}

module.exports = { AddToCart, FetchCartItems, DeleteSingleCartItem, DeleteALlCartItems }