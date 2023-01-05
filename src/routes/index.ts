import express from 'express'
const user = require('./modules/user.route')
const transaction = require('./modules/transaction.route')

const routes = express()

routes.use('/user', user)
routes.use('/transaction', transaction)


module.exports = routes