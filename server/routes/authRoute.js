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


router.post('/validate', (req, res) => {
    try {
        const accessToken = req.cookies.accessToken
        const userObj = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(userObj)
        res.status(200).json({ userObj })
    } catch (err) {
        console.log(err)
        if (err.name === 'TokenExpiredError') {
            console.log("Trying to refresh")
            const userObj = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const accessToken = generateAccessToken(userObj)
            const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            res.cookie('accessToken', accessToken, { maxAge: expirationDate, httpOnly: true, secure: true, sameSite: 'none' })
            return res.status(200).json({ userObj })
        }
        console.log(err)
        res.sendStatus(401)
    }
})


router.get('/', (req, res) => {
    console.log(refreshTokens)
    res.json({ message: "Get Request" })
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '9s' })
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