const bcryptjs = require('bcryptjs');
const User = require('../Schema/userSchema')
const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer");

const RegisterUser = async (req, res) => {
    try {
        let { name, email, password } = req.body

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(401).json({ message: "Email id already registered" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)
        password = hash
        const createUser = await User.create({ name, email, password })

        if (createUser) {
            let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })

            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.MAIL_ID}`,
                    pass: `${process.env.MAIL_PASSWORD}`
                }
            })

            let mailOptions = {
                from: `${process.env.MAIL_ID}`,
                to: `${email}`,
                subject: `OTP from MenZee.app`,
                html: `
                    <h3 style="font-weight: normal;">Hello ${name},</h3>
                    <h3 style="font-weight: normal;">Welcome to MenZee 🛍️</h3>
                    <h2 style="font-weight: normal;">Your registration OTP is <b>${otp}</b> for MenZee.</h2>
                    <p>OTP is only valid for 5min</p>
                    <h3 style="font-weight: normal;">Happy Shopping 😊</h3>
                `
            }

            transport.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response)
                    const setOTPtoDB = await User.updateOne({ email }, { $set: { otp } })
                    if (setOTPtoDB) {
                        res.status(200).json({ message: "OTP sended your email address" })
                    }
                }
            })

        } else {
            res.status(400).json({ message: "Registered failed!!!" })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { RegisterUser }