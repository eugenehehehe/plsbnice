const PORT = 4000
const express = require(`express`)
const app = express()
const cors = require(`cors`)
const bodyParser = require('body-parser')
app.use(cors())
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const adminRoutes = require('./routes/admin.routes')
const coffeeRoutes = require('./routes/coffee.routes')
const orderRoutes = require('./routes/order.routes')

app.use(`/admin`, adminRoutes)
app.use(`/coffee`, coffeeRoutes)
app.use(`/order`, orderRoutes)

app.listen(PORT, () => {
    console.log(`Server of kopi runs on port ${PORT}`)
})