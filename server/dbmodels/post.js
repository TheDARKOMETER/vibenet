import { Schema } from "mongoose";
const mongoose = require('mongoose')

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.type.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.type.ObjectId, ref: 'User' }],
    comments: [{
        text: { type: String },
        author: { type: Schema.type.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now }
    }]
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post;