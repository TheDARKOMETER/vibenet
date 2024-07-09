const express = require('express')
const db = require('./db')
const app = express()
const PORT = 3005
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const session = require('express-session')


app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'] // Add Authorization header here
}))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use(express.json())
app.use(cookieParser())

// Connect to database
db.connectToDatabase(process.env.MONGODB_URI)


app.get('/api', (req, res) => {
    accessToken = req.headers['authorization'] && req.headers['authorization'].split(" ")[1]
    console.log(accessToken)
    res.status(200).send("Hello World!")
})


app.post('/api/posts/add', async (req, res) => {
    try {
        const post = await db.addPostToDatabase(req.body.post)
        console.log(post)
        res.status(200).json(post)
    } catch (err) {
        res.status.send(500)
    }
})

app.get('/api/posts/get', async (req, res) => {
    try {
        const data = await db.getPosts()
        res.status(200).send(data)
    } catch (err) {
        res.sendStatus(500)
    }
})


app.post('/api/comments/add', async (req, res) => {
    try {
        const data = await db.addComment(req.body.comment)
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(500)
    }
})

app.post('/api/comments/get', async (req, res) => {
    try {
        const data = await db.getComments()
        res.status(200).json(data)
    } catch (err) {

    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

function authenticateToken(req, res, next) {
    const accessToken = req.headers['authorization'].startsWith("Bearer ") && req.headers['authorization'].split(" ")[1]
    console.log(accessToken)
}

