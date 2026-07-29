const UserData = require('../../modals/user')
const { userServices } = require('../services')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookies = require("cookie-parser")
const { signoutService, signinService } = require('../services/user.service')

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
    try {
        const result = await signinService(req.body);

        res.cookie("accessToken", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000,
        });

        return res.status(result.status).json({
            message: result.message,
            user: result.user,
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message,
        });
    }
};

const userSignout = async (req, res) => {
    try {
        await signoutService(req.cookies.accessToken);

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
        });

        return res.status(200).json({
            message: "Successfully logout",
        });

    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message,
        });
    }
};

module.exports = { userGet, userPost, userDelete, userPatch, userSignin, userSignout }

