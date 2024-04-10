import { Schema } from "mongoose";

const userScheme = new Schema({
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 13 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "None" },
    gender: { type: String, default: "N/A" },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    subscribers: [{type: Schema.Types.ObjectId, ref: 'User'}],
})