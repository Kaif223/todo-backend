const express = require("express");
const router = express.Router();
// const {todoGet, todoPost} = require('../controllers/todo.controller')
const {userController} = require('../controllers');
const verifyToken = require("../middleaware/verifyToken");



router.route('/api/userDetail').get(verifyToken, userController.userGet)
router.route("/api/signup").post(userController.userPost)
router.route("/api/userDetail/:id").delete(verifyToken, userController.userDelete)
router.route("/api/userDetail/:id").patch(verifyToken, userController.userPatch)
router.route("/api/signin").post(userController.userSignin)
router.route("/api/logout").post(userController.userSignout)
router.route("/api/refresh").post(userController.userRefreshToken)


module.exports = router;
