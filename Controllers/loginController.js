const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../Schema/userSchema")
const SECRET = process.env.SECRET_CODE

const Login = async (req, res) => {
    try {
        let { email, password } = req.body
        const userExist = await User.findOne({ email })
        const checkIsVerified = await User.findOne({ email, isVerified: true })
        if (userExist && checkIsVerified) {
            const matchPassword = await bcryptjs.compare(password, userExist.password)
            if (matchPassword) {
                const generateToken = jwt.sign({ _id: userExist._id }, SECRET)
                res.status(200).json({
                    message: "LoggedIn Successfull",
                    token: generateToken
                })
            } else {
                res.status(401).json({ message: "Incorrect password" })
            }
        } else if (!userExist) {
            res.status(401).json({ message: "User not found" })
        } else if (userExist.isVerified === false) {
            res.status(401).json({ message: "You are not verified registration OTP" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { Login }