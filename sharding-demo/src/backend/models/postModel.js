import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: Number,
    content: String,
    createdAt: Date,
})

export default function createPostModel(connection) {
    return connection.models.Post || connection.model('Post', postSchema)
}