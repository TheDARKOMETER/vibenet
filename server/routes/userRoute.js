const express = require('express')
const app = express()
const router = express.Router()
const db = require('../db.js')

router.use(express.json())

router.post('/add', async (req, res) => {
    try {
        await db.addUserToDatabase(req.body)
        res.sendStatus(200)
    } catch (err) {
        console.error("Error: ", err)
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