const mongoose = require("mongoose")


const CartSchema = new mongoose.Schema({
    prod_img_url1: { type: String, required: true },
    prod_img_url2: { type: String, required: true },
    prod_name: { type: String, required: true },
    prod_style_no: { type: String, required: true },
    prod_sizes: { type: Number, required: true },
    prod_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    prod_category: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    productId: { type: mongoose.Types.ObjectId, required: true },
})

module.exports = mongoose.model("Cart", CartSchema)