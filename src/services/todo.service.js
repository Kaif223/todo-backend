const Todo = require('../../modals/todo')


async function getUser(page, limit, search, status) {

    const skip = (page - 1) * limit;

    const query = {};

    if(search){
        query.userName = {
            $regex: search,
            $options: 'i',
        }
    }

    if(status && status !== 'all'){
        query.status = status
    }
    const data = await Todo.find(query)
        .skip(skip)
        .limit(limit)
    const total = await Todo.countDocuments(query)

    return { todos: data, total }
}

async function editTodo(todoId, todoBody) {
    const data = await Todo.findByIdAndUpdate(
        todoId,
        todoBody,
        {
            new: true
        }
    )
    return data
}
module.exports = { getUser, editTodo }

