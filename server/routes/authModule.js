const express = require('express')
require('dotenv').config({ path: '../.env.local' })
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db')
const auth = require('../auth')

router.use(express.json())
router.use(cookieParser())


const isLoggedIn = (req, res, next) => {
    if (req.session.userToken) {
        next()
    } else {
        res.redirect('/landing')
    }
}



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
        res.status(200).json({ userObj, accessToken: accessToken })
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }

})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.clearCookie('refreshToken')
    res.sendStatus(204)
})


router.post('/validate', (req, res) => {
    let accessToken
    try {
        accessToken = req.headers['authorization']
        console.log(accessToken, "check req header")
        const userObj = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(refreshTokens)
        res.status(200).json({ username: userObj.username, userID: userObj.userID })
    } catch (err) {
        console.log(err)
        if (err.name === 'TokenExpiredError' || (err.name === 'JsonWebTokenError' && accessToken === undefined)) {
            console.log("Trying to refresh")
            const refreshToken = req.cookies.refreshToken
            if (!refreshToken || !refreshTokens.includes(refreshToken)) {
                return res.sendStatus(403)
            }
            const decode = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userObj = { username: decode.username, userID: decode.userID }
            const accessToken = generateAccessToken(userObj)
            console.log(accessToken)
            console.log(userObj)
            return res.status(200).json({ accessToken, userObj })
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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
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

module.exports = {
    router,
    isLoggedIn
}