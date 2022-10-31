const User = require('../Schema/userSchema')
const bcryptjs = require("bcryptjs")

const ResetPassword = async (req, res) => {
    try {
        let { id, password } = req.body
        const userExist = User.findOne({ _id: id })

        if (userExist) {
            const salt = await bcryptjs.genSalt(10)
            const hash = await bcryptjs.hash(password, salt)
            password = hash
            await User.findOneAndUpdate({ _id: id }, { $set: { password } })
            res.status(200).json({ message: "Password Updated" })
        } else {
            res.status(401).json({ message: "User not found" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { ResetPassword }