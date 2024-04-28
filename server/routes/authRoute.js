const express = require('express')
require('dotenv').config({ path: '../.env.local' })
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db')
const auth = require('../auth')

router.use(express.json())
router.use(cookieParser())



router.get('/debug', (req, res) => {
    res.send("Greetings")
})


// Temporary storage of refresh tokens
let refreshTokens = []

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const tryLogin = await login(username, password)

        if (tryLogin) {
            res.status(200).send(tryLogin)
        } else {
            res.status(401).send(tryLogin)
        }

        // const user = { username: req.body.username, userId: req.body.userId }
        // const accessToken = generateAccessToken(user)
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        // refreshTokens.push(refreshToken)
        // res.cookie('refreshToken', refreshToken, { httpOnly: true })
        // res.cookie('accessToken', accessToken, { httpOnly: true })
        // res.status(200)
    } catch (err) {
        res.sendStatus(500)
        throw err
    }

})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

router.post('/token', (req, res) => {
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

router.get('/', (req, res) => {
    console.log(refreshTokens)
    res.json({ message: "Get Request" })
})

// For Debugging HttpOnly cookie, will be used to store cookies in http rather than local storage for improved security.
router.get('/cookie', (req, res) => {
    res.cookie('myCookie', 'cookieValuezz', { httpOnly: true })
    res.send("Cookie Set!")
})

router.get('/read-cookie', (req, res) => {
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

async function login(username, password) {
    const targetUser = await db.fetchUser(username)
    const hashedPassword = targetUser.password
    return auth.comparePassword(password, hashedPassword)
}

// router.listen(4001, () => {
//     console.log(refreshTokens)
//     console.log("JWT Test server running")
// })

module.exports = router