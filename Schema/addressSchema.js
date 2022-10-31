const mongoose = require("mongoose")

const AddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mob_no: { type: Number, required: true },
    alter_mob_no: { type: Number },
    house_no: { type: String, required: true },
    street_name: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    country: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
})

module.exports = mongoose.model("Address", AddressSchema)