const express = require('express')
const router = express.Router()
const db = require('../db.js')

router.use(express.json())

router.post('/add', async (req, res) => {
    try {
        const userObject = await db.addUserToDatabase(req.body)
        console.log("Successfully saved user:", userObject)
        res.sendStatus(200)
    } catch (err) {
        console.error("Error: ", err)
        console.log(err.keyPattern.email, "Key")
        if (err.keyPattern.email === 1) {
            return res.status(409).json({ error: 'Email already taken' })
        }
        res.sendStatus(500)
    }
})

router.get('/availability', async (req, res) => {
    try {
        const { username } = req.query
        const isAvailable = await db.checkUsernameAvailability(username)
        res.status(200).send(isAvailable)
    } catch (err) {
        console.error("Error: ", err)
        res.sendStatus(500)
    }
})

module.exports = router