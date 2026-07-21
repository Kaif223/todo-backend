const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")
// const Todo = require("./modals/todo")
// const UserData = require("./modals/user")
const routes = require("./src/routes/index")


const app = express();

app.use(express.json())
app.use(cors())

const port = 8000;

mongoose.connect("mongodb+srv://zulkaif044_db_user:Kaifrana223@cluster0.pgtsyej.mongodb.net/?appName=Cluster0")
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => {
        console.log("Database connection failed", error)
    })

app.get('/api/health', async(req, res) => {

    const setTimm = await Date.now();
    res.json(setTimm)
})

app.use(routes)

app.listen(port, () => {
    console.log(`Server is ruuning at http://localhost:${port}`)
})

// hyper text transfer protocol HTTP