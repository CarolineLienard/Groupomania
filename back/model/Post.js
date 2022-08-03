const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
        max: 1024,
        min: 6
    },
    imageUrl: {
        type: String, 
        required: true,
    },
    likes: {
        type: Number
    },
    usersLiked: {
        type: [String]
    }
})

module.exports = mongoose.model('Post', postSchema)