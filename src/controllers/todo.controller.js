const Todo = require('../../modals/todo')
const { todosServices } = require('../services')

const todoGet = async (req, res) => {
    console.log("start")
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 100)
    const search = req.query.search
    const status = req.query.status
    const data = await todosServices.getUser(page, limit, search, status)


    res.json(data)
}

const todoPost = async (req, res) => {


    if (!req.body.userName) {
        return res.status(400).json({
            message: "userName is reqiured"
        })
    }
    const data = await Todo.create({
        userName: req.body.userName,
        userMail: req.body.userMail,
        userNumber: req.body.userNumber,
        status: req.body.status || "pending"
    });

    res.json({
        message: "todo is save",
        todo: data
    })

}

const todoDelete = async (req, res) => {

    const userId = req.params.id
    const data = await Todo.findByIdAndDelete(userId)
    res.json({
        message: "user id is delete",
        todo: data
    })
}

const todoPatch = async (req, res) => {

    const todoId = req.params.id
    const todoBody = req.body
    const data = await todosServices.editTodo(todoId, todoBody)

    res.json({
        message: "your todo item is updated",
        todo: data
    })
}

module.exports = { todoGet, todoPost, todoDelete, todoPatch }

