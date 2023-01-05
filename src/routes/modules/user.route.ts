import express from "express"
const controller = require("../../controllers/user.controller")
const isAuth = require('../../middleware/isAuth')

const router = express()

router.post("/signup", controller.addUser)
router.post("/signin", controller.signin)
router.get("/accountBalance", isAuth, controller.getAccountBalance)


module.exports = router