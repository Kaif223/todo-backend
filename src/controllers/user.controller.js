const UserData = require('../../modals/user')
const { userServices } = require('../services')
const bcrypt = require("bcrypt")


const userGet = async (req, res) => {

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
    // console.log("🚀 ~ userSignin ~ user:", user)
    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    // console.log("🚀 ~ userSignin ~ passwordCompare:", passwordCompare)
    if(!passwordCompare){
        return res.status(400).json({error: "invalid email"})
    }

    // if (password !== user.password) {
    //     return res.status(400).json({
    //         message: "invalid password"
    //     })
    // }

    res.json({
        message: "login successfull",
        user: user
    })

}

module.exports = { userGet, userPost, userDelete, userPatch, userSignin }

