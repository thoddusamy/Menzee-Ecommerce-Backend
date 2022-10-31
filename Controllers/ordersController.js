const CashOrders = require('../Schema/cashOrdersSchema')
const PaidOrders = require('../Schema/paidOrdersSchema')

const CashOrder = async (req, res) => {
    try {
        req.body.userId = req.userId
        let orderplaced = await CashOrders.create(req.body)
        if (orderplaced) {
            res.status(200).json({ orderSuccess: true })
        } else {
            res.status(400).json({ orderSuccess: false, message: "Order place Failed!" })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ orderSuccess: false, message: "Order place Failed!" })
    }
}

const FetchOrders = async (req, res) => {
    try {
        let cashOrder = await CashOrders.find({ userId: req.userId })
        let paidOrder = await PaidOrders.find({ userId: req.userId })

        if (cashOrder || paidOrder) {
            res.status(200).json({ orderFound: true, cashOrder, paidOrder })
        } else {
            res.status(400).json({ orderFound: false })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ orderFound: false })
    }
}

const FetchAllOrders = async (req, res) => {
    try {
        let cashOrder = await CashOrders.find()
        let paidOrder = await PaidOrders.find()

        if (cashOrder || paidOrder) {
            res.status(200).json({ orderFound: true, cashOrder, paidOrder })
        } else {
            res.status(400).json({ orderFound: false })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ orderFound: false })
    }
}


module.exports = { CashOrder, FetchOrders, FetchAllOrders }