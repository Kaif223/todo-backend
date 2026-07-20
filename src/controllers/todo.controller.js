const { todosServices } = require('../services')

const todoGet = async (req, res) => {
    console.log("start")
    // const data = fs.readFileSync('data/todos.json')
    // const todos = JSON.parse(data)
    const page = Number(req.query.page || 1)
    const limit = Number(req.query.limit || 100)
    const data = await todosServices.getUser(page, limit)

    res.json(data)
}

const todoPost = async (req, res) => {

    // const filesPath = path.join(__dirname, 'data', 'todos.json')
    // const data = fs.readFileSync(filesPath)
    // const todos = JSON.parse(data)

    // const newTodo = {

    //     id: Date.now(),
    //     userName: req.body.userName,
    //     status: req.body.status || "pending"
    // }
    // todos.push(newTodo),

    // fs.writeFileSync(filesPath, JSON.stringify(todos))

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

    // const filesPath = path.join(__dirname, 'data', 'todos.json')
    // const data = fs.readFileSync(filesPath)
    // const todos = JSON.parse(data)

    // const userId = req.params.id
    // const handleDelete = todos.filter(item => item.id !== Number(userId))
    // fs.writeFileSync(filesPath, JSON.stringify(handleDelete))

    const userId = req.params.id
    const data = await Todo.findByIdAndDelete(userId)
    res.json({
        message: "user id is delete",
        todo: data
    })
}

const todoPatch = async (req, res) => {
    // const filesPath = path.join(__dirname, 'data', 'todos.json')
    // const data = fs.readFileSync(filesPath)
    // const todos = JSON.parse(data)
    // const userId = req.params.id
    // const handleEdit = todos.map(item => item.id === Number(userId) ? { ...item, ...req.body } : item)
    // fs.writeFileSync(filesPath, JSON.stringify(handleEdit))

    const todoId = req.params.id
    const todoBody = req.body
    const data = await todosServices.editTodo(todoId, todoBody)

    res.json({
        message: "your todo item is updated",
        todo: data
    })
}

module.exports = { todoGet, todoPost, todoDelete, todoPatch }

