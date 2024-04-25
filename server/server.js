const express = require('express')
const db = require('./db')
const app = express()
const PORT = 3005
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcrypt')
const cors = require('cors')

app.use(express.json())

// Connect to database
db.connectToDatabase(process.env.MONGODB_URI)

app.use(cors({
    origin: [
        'http://localhost:3000'
    ]
}))


app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.post('/users', async (req, res) => {
    try {
        await db.addUserToDatabase(req.body)
        res.sendStatus(200)
    } catch (err) {
        console.error("Error: ", err)
        res.sendStatus(500)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

function authenticateToken(req, res, next) {

}

