const express = require('express')
require('./db/mongoose')

const app = express()

app.use(express.json())

const PORT = 3000

const userRoute = require('./routes/user')
app.use(userRoute)

app.listen(PORT, () => console.log(`server running upon port ${PORT}`))