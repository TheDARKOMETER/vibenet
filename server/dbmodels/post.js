
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;