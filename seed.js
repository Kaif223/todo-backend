const mongoose = require("mongoose")
const Todo = require("./modals/todo")

mongoose.connect("mongodb://localhost:27017/todo_practice")
.then(() => {
    console.log("Database connected");
    seedData()
})
.catch((error) => {
    console.log(error);
});

const todos = [];
for (let i = 1; i <= 40; i++) {
    const objCreate = {
        userName: "ahmad",
        userMail: "ahmad@gmail.com",
        userNumber: "024-234324 32",
        status: "pending"
    }
        todos.push(objCreate)
}

async function seedData(){
    await Todo.insertMany(todos)
    console.log("40 todos inserted");
    mongoose.connection.close();
}

