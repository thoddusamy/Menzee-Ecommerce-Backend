const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: Number },
    isVerified: { type: Boolean, default: false },
    img: { type: String, default: "https://res.cloudinary.com/thoddusamy/image/upload/v1666864012/menzee/defalut_boyqiz.png" }
})

module.exports = mongoose.model("Admin", AdminSchema)