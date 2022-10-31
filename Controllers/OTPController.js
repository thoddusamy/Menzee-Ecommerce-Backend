const User = require("../Schema/userSchema")

const verifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body
        const userExist = await User.findOne({ email })
        if (userExist) {
            if (userExist.otp == otp) {
                await User.updateOne({ email }, { $set: { isVerified: true } })
                await User.updateOne({ email }, { $unset: { otp: '' } })
                res.status(200).json({ message: "Registered Successfull" })
            } else {
                res.status(401).json({ message: "OTP not valid. Check your OTP" })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const RemoveOTP = async (req, res) => {
    try {
        let { email } = req.params
        let removeUser = await User.findOneAndDelete({ email })
        if (removeUser) {
            res.status(200).json({ message1: "OTP Expired", message2: "Please Register again" })
        } else {
            res.json({ message1: "Error" })
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = { verifyOTP, RemoveOTP }