import express from "express"
const controller = require("../../controllers/transaction.controller")
const isAuth = require('../../middleware/isAuth')

const router = express()

router.post("/deposit", isAuth, controller.deposit)
router.post("/withdraw", isAuth, controller.withdraw)
router.post("/transfer", isAuth, controller.transfer)
router.get("/history", isAuth, controller.getTransactionHistory)


module.exports = router