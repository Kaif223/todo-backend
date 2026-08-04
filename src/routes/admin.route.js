const express = require("express");
const router = express.Router();
// const {todoGet, todoPost} = require('../controllers/todo.controller')
const {adminController} = require('../controllers');
const verifyToken = require("../middleaware/verifyToken");



router.route('/api/adminDashboard').get(verifyToken, adminController.adminGet)



module.exports = router;
