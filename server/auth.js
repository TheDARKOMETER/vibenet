const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())



const hashPass = async (plaintextPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(plaintextPassword, 5)
        return hashedPassword
    } catch (err) {
        throw err
    }
}


const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword)
        return isMatch
    } catch (err) {
        throw err
    }
}
// const authenticateUser = (req, res, next) => {
//     if req.
// }

module.exports = {
    hashPass,
    comparePassword
}