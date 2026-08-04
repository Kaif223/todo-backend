const express = require("express")
const router = express.Router()
const todoRoutes = require("./todo.route")
const UserRoutes = require("./user.route")
const adminRoutes = require("./admin.route")

router.use('/', todoRoutes)
router.use('/', UserRoutes)
router.use('/', adminRoutes)

module.exports = router