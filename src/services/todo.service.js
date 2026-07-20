const Todo = require('../../modals/todo')


async function getUser(page, limit) {

    const skip = (page - 1) * limit

    const data = await Todo.find()
        .skip(skip)
        .limit(limit)
    return data
}

async function editTodo(todoId, todoBody) {
    const data = await Todo.findByIdAndUpdate(todoId, todoBody)
    console.log("🚀 ~ editTodo ~ data:", data)
    return data
}
module.exports = { getUser, editTodo }

