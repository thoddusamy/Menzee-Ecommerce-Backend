const Razorpay = require('razorpay');
const crypto = require("crypto");
const PaidOrders = require('../Schema/paidOrdersSchema')

// ----------- create razorpay instance ----------
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const GetKey = async (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
}

const CheckOut = async (req, res) => {

    let { amount } = req.body

    const options = {
        amount: amount * 100,
        currency: "INR",
    };

    const order = await instance.orders.create(options)

    res.status(200).json({ orderSuccess: true, order })
}

const PaymentVerification = async (req, res) => {

    let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature

    if (isAuthentic) {
        req.body.userId = req.userId
        const createOrder = await PaidOrders.create(req.body)
        if (createOrder) {
            res.status(200).json({ orderSuccess: true })
        } else {
            res.status(400).json({ orderSuccess: false, message: "Order place Failed!" })
        }

    } else {
        res.status(400).json({ orderSuccess: false, message: "Order place Failed!" })
    }
}

module.exports = { GetKey, CheckOut, PaymentVerification }