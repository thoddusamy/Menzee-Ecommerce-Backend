const Address = require('../Schema/addressSchema')

const SaveAddress = async (req, res) => {
    try {
        req.body.userId = req.userId
        let saveAddress = await Address.create(req.body)
        if (saveAddress) {
            res.status(200).json({ message: "Address Saved" })
        } else {
            res.status(401).json({ message: "Address Saved Error" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Address Saved Error" })
    }
}

const UpdateAddress = async (req, res) => {
    try {
        req.body.userId = req.userId
        let updateAddress = await Address.findOneAndUpdate({ userId: req.userId }, { $set: (req.body) })
        if (updateAddress) {
            res.status(200).json({ message: "Update Address Saved" })
        } else {
            res.status(401).json({ message: "Update Address Error" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Update Address Error" })
    }
}

const FetchAddressByUserId = async (req, res) => {
    try {
        const fetchAddByUserId = await Address.findOne({ userId: req.userId })
        if (fetchAddByUserId) {
            res.status(200).json(fetchAddByUserId)
        } else {
            res.status(401).json({ message: "fetchAddress Error" })
        }
    } catch (error) {
        res.status(401).json({ message: "fetchAddress Error" })
        console.log(error);
    }
}

module.exports = { SaveAddress, FetchAddressByUserId, UpdateAddress }