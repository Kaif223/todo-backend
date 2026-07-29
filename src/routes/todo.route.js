const express = require("express");
const router = express.Router();
// const {todoGet, todoPost} = require('../controllers/todo.controller')
const {todoscontroller} = require('../controllers');
const verifyToken = require("../middleaware/verifyToken");



router.route('/api/todos').get(verifyToken, todoscontroller.todoGet)
router.route("/api/todos").post(verifyToken, todoscontroller.todoPost)
router.route("/api/todos/:id").delete(verifyToken, todoscontroller.todoDelete)
router.route("/api/todos/:id").patch(verifyToken, todoscontroller.todoPatch)

module.exports = router;
