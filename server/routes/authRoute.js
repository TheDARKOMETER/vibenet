const express = require('express')
require('dotenv').config({ path: '../.env.local' })
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db')
const auth = require('../auth')

router.use(express.json())
router.use(cookieParser())



// Temporary storage of refresh tokens use redis
let refreshTokens = []

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const tryLogin = await login(username, password)

        if (!tryLogin) {
            return res.status(401).json({ error: "Please enter correct username/password" })
        }
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        const user = await db.fetchUser(username)
        const userObj = { username: user.username, userID: user._id }
        const accessToken = generateAccessToken(userObj)
        const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken)
        res.cookie('refreshToken', refreshToken, { expires: expirationDate, maxAge: expirationDate, httpOnly: true, secure: true, sameSite: 'none' })
        res.cookie('accessToken', accessToken, { maxAge: expirationDate, httpOnly: true, secure: true, sameSite: 'none' })
        res.status(200).json({ userObj })
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
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    res.cookie('myCookie', 'suckaz', { maxAge: expirationDate, httpOnly: true, secure: true, sameSite: 'none' })
    res.send("Cookie Set!")
})

router.get('/read-cookie', (req, res) => {
    const myCookieValue = req.cookies.myCookie;
    console.log(myCookieValue)
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
    try {
        const targetUser = await db.fetchUser(username)
        if (targetUser) {
            const hashedPassword = targetUser.password
            return auth.comparePassword(password, hashedPassword)
        } else {
            return false
        }

    } catch (err) {
        throw err
    }

}

// router.listen(4001, () => {
//     console.log(refreshTokens)
//     console.log("JWT Test server running")
// })

module.exports = router