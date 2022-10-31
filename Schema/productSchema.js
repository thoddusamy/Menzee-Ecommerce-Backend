const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    prod_img_url1: { type: String, required: true },
    prod_img_url2: { type: String },
    prod_name: { type: String, required: true },
    prod_style_no: { type: String, required: true },
    prod_sizes: { type: Array, required: true },
    prod_price: { type: Number, required: true },
    prod_category: { type: String, required: true },
})

module.exports = mongoose.model("Product", ProductSchema)