const express = require('express')
const app = express()


app.post('/', async (req, res) => {
    try {
        await db.addUserToDatabase(req.body)
        res.sendStatus(200)
    } catch (err) {
        console.error("Error: ", err)
        res.sendStatus(500)
    }
})
