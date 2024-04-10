const mongoose = require('mongoose')

const connectToDatabase = async (DB_URI) => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to DB successfully")
    } catch (error) {
        console.error('Error connecting to database', error)
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
    connectToDatabase
}