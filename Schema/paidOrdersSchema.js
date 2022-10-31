const mongoose = require("mongoose")

const PaidOrdersSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    total_amount: { type: Number, required: true },
    payment_mode: { type: String, required: true },
    payment_done: { type: Boolean, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    address: { type: Array, required: true },
})

module.exports = mongoose.model("PaidOrders", PaidOrdersSchema)