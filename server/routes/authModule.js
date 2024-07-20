const express = require('express')
require('dotenv').config({ path: '../.env.local' })
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const db = require('../db')
const auth = require('../auth')

router.use(express.json())
router.use(cookieParser())


const isLoggedIn = async (req, res, next) => {
    const accessToken = req.session.accessToken
    if (!accessToken) return res.status(401).send('Unauthorized')

    try {
        const user = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        console.log("User verified via middleware")
        console.log(user)
        next()
    } catch (error) {
        if (refreshTokens.includes(req.cookies.refreshToken)) {
            try {
                const decodedRefreshToken = await jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET)
                const user = await db.fetchUser(decodedRefreshToken.username)
                req.user = user
                console.log(decodedRefreshToken, user)
                console.log("Trying to refresh token")
                if (!user) return res.status(401)

                const newAccessToken = generateAccessToken({ username: user.username, userID: user._id })
                req.session.accessToken = newAccessToken
                return next()
            } catch (error) {
                console.error(error)
                return res.status(401).send('Unauthorized')
            }
        } else {
            return res.status(401).send('Unauthorized')
        }
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
        req.session.accessToken = accessToken
        res.cookie('refreshToken', refreshToken, { expires: expirationDate, maxAge: expirationDate, httpOnly: true, secure: true, sameSite: 'none' })
        res.status(200).json({ userObj })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error" })
    }

})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.clearCookie('refreshToken')
    res.sendStatus(204)
})




router.get('/validate', isLoggedIn, (req, res) => {
    console.log(refreshTokens)
    console.log(req.user.username)
    const userObj = { username: req.user.username, userID: req.user.userID }
    res.status(200).json(userObj)
})


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5s' })
}

async function login(username, password) {
    try {
        const targetUser = await db.fetchUser(username, false)
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