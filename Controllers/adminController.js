const Admin = require("../Schema/adminSchema")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET = process.env.SECRET_CODE

const AdminLogin = async (req, res) => {
    try {
        let { email, password } = req.body
        const userExist = await Admin.findOne({ email })
        const checkIsVerified = await Admin.findOne({ email, isVerified: true })
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

const GetAdminDetails = async (req, res) => {
    try {
        const findUser = await Admin.findOne({ _id: req.userId })
        if (findUser) {
            res.status(200).json({
                img: findUser.img,
                name: findUser.name,
            })
        } else {
            res.status(401).json({ message: "Error" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Error" })
    }
}

module.exports = { GetAdminDetails, AdminLogin }