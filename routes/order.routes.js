const express = require("express")
const app = express()
app.use(express.json())
const orderController = require(`../controllers/order.controller`)
const auth = require(`../auth/auth`)
// const { authorize } = require('../controllers/auth.controller')

app.post('/', orderController.createOrder)
app.get('/history', auth.authVerify, orderController.orderHistory)

module.exports = app