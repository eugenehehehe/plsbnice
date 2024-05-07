const express = require('express')

const app = express()

const auth = require('../auth/auth')

app.use(express.json())

const coffeeController =
require('../controllers/coffee.controller')

app.get("/:search", coffeeController.searchCoffee)

app.post("/", auth.authVerify, coffeeController.addCoffee)

app.put("/:id", auth.authVerify, coffeeController.updateCoffee)

app.delete("/:id", auth.authVerify, coffeeController.deleteCoffee)

module.exports = app