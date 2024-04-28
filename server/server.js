const express = require('express')
const db = require('./db')
const app = express()
const PORT = 3005
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcrypt')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
app.use(cors({
    origin: [
        'http://localhost:3000'
    ]
}))
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use(express.json())

// Connect to database
db.connectToDatabase(process.env.MONGODB_URI)




app.get('/api', (req, res) => {
    console.log(req.body)
    res.send("Hello World!")
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

function authenticateToken(req, res, next) {

}

