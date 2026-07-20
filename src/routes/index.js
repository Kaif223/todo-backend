const express = require("express")
const router = express.Router()
const todoRoutes = require("./todo.route")
const UserRoutes = require("./user.route")

router.use('/', todoRoutes)
router.use('/', UserRoutes)

module.exports = router