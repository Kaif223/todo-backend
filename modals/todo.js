const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    userName: String,
    userMail: String,
    userNumber: String,

    userDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        default: "pending"
    }
})


const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;