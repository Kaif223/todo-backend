const UserData = require('../../modals/user')
const { userServices } = require('../services')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookies = require("cookie-parser")

const secret = "secret123"


const userGet = async (req, res) => {

    // const token = req.cookies.accessToken
    const data = await UserData.find()
    res.json(data)

}

const userPost = async (req, res) => {

    const userBody = req.body
    if (!userBody.userName) {
        return res.status(400).json({
            message: "userName is reqiured"
        })
    }

    const data = await userServices.postUser(userBody)
    res.json({
        message: "user is save",
        user: data
    })

}

const userDelete = async (req, res) => {

    const id = req.params.id
    const data = await UserData.findByIdAndDelete(id)
    res.json({
        message: "user is delete",
        user: data
    })
}

const userPatch = async (req, res) => {

    const userId = req.params.id
    const userBody = req.body
    const data = await userServices.editUser(userId, userBody)

    res.json({
        message: "user updated successfully",
        todo: data
    })
}

const userSignin = async (req, res) => {

    const { userMail, password } = req.body

    const user = await UserData.findOne({
        userMail: userMail
    })

    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        return res.status(400).json({error: "invalid email"})
    }

    const payload = {
        userId: user._id,
        userMail: user.userMail
    }
    const token = jwt.sign(payload, secret, {
        expiresIn: "15m"
    })

    const cookies =  res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        secure: false
    })


    // if (password !== user.password) {
    //     return res.status(400).json({
    //         message: "invalid password"
    //     })
    // }

    res.json({
        message: "login successfull",
        user: user,
    })

}

const userSignout = async(req, res) => {

    const token =  req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message: "no active session"})
    }
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false
    })

    return res.status(200).json({message: "successfully logout"})
}

module.exports = { userGet, userPost, userDelete, userPatch, userSignin, userSignout }

