const express = require("express");
const router = express.Router();
// const {todoGet, todoPost} = require('../controllers/todo.controller')
const {userController} = require('../controllers');
const verifyToken = require("../middleaware/verifyToken");



router.route('/api/userDetail').get(verifyToken, userController.userGet)
router.route("/api/signup").post(userController.userPost)
router.route("/api/userDetail/:id").delete(userController.userDelete)
router.route("/api/userDetail/:id").patch(userController.userPatch)
router.route("/api/signin").post(userController.userSignin)
router.route("/api/logout").post(userController.userSignout)


module.exports = router;
