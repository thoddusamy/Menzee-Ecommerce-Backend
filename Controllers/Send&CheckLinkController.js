const User = require("../Schema/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


const SendResetLink = async (req, res) => {
    try {
        let { email } = req.body
        const checkUserExist = await User.findOne({ email })

        if (checkUserExist) {

            const secret = process.env.SECRET_CODE + checkUserExist.password
            const token = jwt.sign({ email: checkUserExist.email, id: checkUserExist._id }, secret, { expiresIn: '15m', })

            const link = `${process.env.FRONTEND_URL}/forgetpassword/${checkUserExist._id}/${token}`

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
                subject: `ResetLink from MenZee.app`,
                text: `Hello ${checkUserExist.name},\n
                Welcome to MenZee 🛍️\n
                Use below link to reset your password 👇\n
                ${link}\n
                **Link is valid for 15 minutes & Only once**\n
                Happy Shopping 😊`
            }

            transport.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info.response)
                    res.status(200).json({ message: "Reset Link sended your email address" })
                }
            })
        } else {
            res.status(401).json({ message: "User not Exists! Please register first" })
        }

    } catch (error) {
        console.log(error);
    }
}


const CheckURL = async (req, res) => {
    try {
        let { id, token } = req.body
        const userExist = await User.findOne({ _id: id })

        if (userExist) {
            const secret = process.env.SECRET_CODE + userExist.password
            const verify = jwt.verify(token, secret)
            if (verify) {
                res.status(200).json({ message: "Link Verified" })
            } else {
                res.status(401).json({ message: "Link is not valid" })
            }
        } else {
            res.status(401).json({ message: "User not exist" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Link Expired" })
    }
}

module.exports = { SendResetLink, CheckURL }