import { Schema, model } from "mongoose";

const replySchema = new Schema({
    text: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{type: Schema.Types.ObjectId}]
})

const Reply = model('Reply', replySchema)
module.exports = Reply