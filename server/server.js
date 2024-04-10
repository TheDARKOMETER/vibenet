const express = require('express')
const db = require('./middleware/db')
const app = express()
const PORT = 3005
require('dotenv').config({ path: '.env.local' })


// Connect to database
db.connectToDatabase(process.env.MONGODB_URI)


app.get('/', (req, res) => {
    res.send("Hello World!")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


