const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userMail: {
        type: String,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})


const UserData = mongoose.model("UserData", UserSchema)

module.exports = UserData;