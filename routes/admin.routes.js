const express = require(`express`)
const app = express()

const controller = require('../controllers/admin.controller')

app.use(express.json())

app.post("/auth", controller.Login)

module.exports = app