const express = require("express");
const router = express.Router();
// const {todoGet, todoPost} = require('../controllers/todo.controller')
const {todoscontroller} = require('../controllers')



router.route('/api/todos').get(todoscontroller.todoGet)
router.route("/api/todos").post(todoscontroller.todoPost)
router.route("/api/todos/:id").delete(todoscontroller.todoDelete)
router.route("/api/todos/:id").patch(todoscontroller.todoPatch)

module.exports = router;
