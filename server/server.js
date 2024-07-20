const express = require('express')
const db = require('./db')
const app = express()
const PORT = 3005
const jwt = require('jsonwebtoken')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });

require('dotenv').config({ path: '.env.local' })
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const authModule = require('./routes/authModule')
const authRoute = authModule.router
const authMiddleWare = authModule.isLoggedIn
const session = require('express-session')


app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:3005'
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'] // Include 'Authorization' header
}));

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use(express.json())
app.use(cookieParser())


// Connect to database
db.connectToDatabase(process.env.MONGODB_URI)


app.get('/api', (req, res) => {
    accessToken = req.headers['authorization'] && req.headers['authorization'].split(" ")[1]
    res.status(200).send("Hello World!")
})


app.post('/api/posts/add', async (req, res) => {
    try {
        const post = await db.addPostToDatabase(req.body.post)
        res.status(200).json(post)
    } catch (err) {
        res.status.send(500)
    }
})

app.get('/api/posts/get', authMiddleWare, async (req, res) => {
    try {
        const data = await db.getPosts()
        res.status(200).send(data)
    } catch (err) {
        res.sendStatus(500)
    }
})

app.post('/api/images/add', upload.none(), async (req, res) => {
    try {
        console.log(req.body.data); // File info
        console.log(req.body.name); // Other form fields
        console.log(req.body.contentType); // Other form fields

        const uploadImage = await db.uploadImage(req.body.data, req.body.name, req.body.contentType)
        res.status(200).json(uploadImage)
    }
    catch (err) {
        console.error(err)
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

app.post('/api/comments/get', authMiddleWare, async (req, res) => {
    try {
        const data = await db.getComments()
        res.status(200).json(data)
    } catch (err) {

    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})


