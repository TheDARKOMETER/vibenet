const mongoose = require('mongoose')
const Schema = mongoose.Schema
const imageSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    data: String,
    createdAt: { type: Date, default: Date.now },
    type: {
        type: String,
        enum: ['Media', 'Profile'],
        default: 'Media'
    },
})

const Image = mongoose.model('Image', imageSchema)
module.exports = Image