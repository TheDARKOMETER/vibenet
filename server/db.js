const mongoose = require('mongoose')
const User = require('./dbmodels/user')
const auth = require('./auth')

const connectToDatabase = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to DB successfully")
    } catch (error) {
        console.error('Error connecting to database', error)
    }
}


const addUserToDatabase = async (req) => {
    const { username, password, email, birthdate, gender } = req
    const currentDate = Date.now()
    const dateDiff = currentDate - new Date(birthdate)
    const age = Math.floor(dateDiff / (3.154 * Math.pow(10, 10)))
    console.log(age)
    try {
        const hashedPassword = await auth.hashPass(password)
        const userObject = new User({
            username,
            age,
            birthdate,
            email,
            gender,
            password: hashedPassword
        })

        console.log("Successfully saved user:", userObject)
        return userObject.save()
    } catch (err) {
        console.error("An error occured when adding a user:", err)
        console.error(err.keyPattern, "KEY")
        throw err
    }
}

const checkUsernameAvailability = async (username) => {
    try {
        // Case insenstive regex can be quite slow, so it could be possible to implement lowercase
        // name attribute on schema for indexing 
        const user = await fetchUser(username)
        const userExists = user ? true : false
        console.log(userExists, user)
        return userExists
    } catch (err) {
        throw err
    }
}


const fetchUser = async (username) => {
    try {
        const user = await User.findOne({ username }).collation({ locale: "en", strength: 2 })
        return user
    } catch (err) {
        throw err
    }
}
//connectToDatabase()

// Test CRUD Operation
// const Document = mongoose.model('Document', {
//     name: {type: String, required: true},
//     age: {type: String, required: true}
// }, 'documents')

// const testConnection = async () => {
//     const document = new Document({ name: 'John', age: 30 })
//     try {
//         await document.save()
//         console.log('Successfully created document')
//     } catch(error) {
//         console.error("an error occured", error)
//     }


// }
//testConnection()

module.exports = {
    connectToDatabase,
    addUserToDatabase,
    fetchUser,
    checkUsernameAvailability
}