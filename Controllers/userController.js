const User = require("../Schema/userSchema")


const GetUserDetails = async (req, res) => {
    try {
        const findUser = await User.findOne({ _id: req.userId })
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

const UpdateProfilePic = async (req, res) => {
    try {
        const { img } = req.body
        await User.findOneAndUpdate({ _id: req.userId }, { $set: { img } })
        res.status(200).json({ message: "Profile pic updated" })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Profile pic update failed" })
    }
}

module.exports = { GetUserDetails, UpdateProfilePic }