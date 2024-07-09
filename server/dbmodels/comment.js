const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentPost: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    createdAt: { type: Date, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment