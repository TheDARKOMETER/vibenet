const express = require('express')
const app = express()
require('dotenv').config({ path: '../.env.local' })
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


app.use(express.json())
app.use(cookieParser())

// Temporary storage of refresh tokens
let refreshTokens = []

app.post('/login', (req, res) => {
    const user = { username: req.body.username, userId: req.body.userId }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })

})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken === null) {
        return res.sendStatus(401)
    }
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(401)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.get('/', (req, res) => {
    console.log(refreshTokens)
    res.json({ message: "Get Request" })
})

app.get('/cookie', (req, res) => {
    res.cookie('myCookie', 'cookieValuezz', { httpOnly: true })
    res.send("Cookie Set!")
})

app.get('/read-cookie', (req, res) => {
    const myCookieValue = req.cookies.myCookie;

    if (myCookieValue) {
        res.status(200).send('Value of myCookie ' + myCookieValue)
    } else {
        res.status(404).send('Cookie value not found')
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

app.listen(4001, () => {
    console.log(refreshTokens)
    console.log("JWT Test server running")
})