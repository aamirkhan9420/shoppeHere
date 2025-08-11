const { connection } = require('./confige/db')
const express = require('express')
const app = express()
require('dotenv').config()
app.use(express.json())
let cors = require('cors')
const { userRouter } = require('./routes/user.route')
const {ProductListRouter} = require('./routes/productList.route')
const { bannerListRouter } = require('./routes/banner.route')
app.use(cors({
    origin: "*"
}))

let PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.send("welcome to home")
})
app.use('/user', userRouter)
app.use('/product', ProductListRouter)
app.use('/banner', bannerListRouter)

app.listen(PORT, async (req, res) => {
    try {
        await connection
        console.log(`listening on port ${PORT}`)
    } catch (error) {
        console.log(`error while connecting`, error)
    }
})