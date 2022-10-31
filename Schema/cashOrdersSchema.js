const mongoose = require("mongoose")

const CashOrdersSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    total_amount: { type: Number, required: true },
    payment_mode: { type: String, required: true },
    payment_done: { type: Boolean, required: true },
    address: { type: Array, required: true },
})

module.exports = mongoose.model("CashOrders", CashOrdersSchema)