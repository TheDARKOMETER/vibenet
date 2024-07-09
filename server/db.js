const mongoose = require('mongoose')
const User = require('./dbmodels/user')
const Post = require('./dbmodels/post')
const Comment = require('./dbmodels/comment')
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
        return userObject.save()
    } catch (err) {
        console.error("An error occured when adding a user:", err)
        console.error(err.keyPattern, "KEY")
        throw err
    }
}

const addPostToDatabase = async (req) => {

    try {
        const newPost = new Post(req)
        return await newPost.save()
    } catch (err) {
        console.error("An error occured when adding post", err)
        console.error(err.keyPattern, "KEY")
        throw err
    }
}


const getComments = async (postId) => {
    try {
        const comments = await Comment.find()
        return comments
    } catch (err) {
        console.error(err)
        throw err
    }
}

const populatePostSchema = [
    { path: "author", select: "username profilePicture" },
    { path: "comments", populate: { path: "author", select: "username profilePicture" } },
    { path: "likes", select: "username profilePicture" },
    { path: "shares", select: "username profilePicture" }
]

const addCommentToPost = async (req) => {
    try {
        let comment = new Comment(req)
        comment = await comment.save()
        const post = await Post.findByIdAndUpdate(comment.parentPost,
            { $push: { comments: comment._id } },
            { new: "true" }).populate(populatePostSchema)
        console.log(post)
        return post
    } catch (err) {
        console.error(err)
        throw err
    }
}

const getPosts = async () => {
    try {
        const posts = await Post.find().populate(populatePostSchema)
        console.log(posts, "posts")
        return posts
    } catch (err) {
        console.error(err)
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
    getComments,
    addComment: addCommentToPost,
    getPosts,
    checkUsernameAvailability,
    addPostToDatabase
}