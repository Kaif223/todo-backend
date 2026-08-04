const Todo = require("../../modals/todo");
const UserData = require("../../modals/user");



const adminGet = async (req, res) => {

    const totalUsers = await UserData.countDocuments();
    const totalTodos = await Todo.countDocuments();
    res.json({
        totalUsers,
        totalTodos
    })

}
module.exports = { adminGet }
