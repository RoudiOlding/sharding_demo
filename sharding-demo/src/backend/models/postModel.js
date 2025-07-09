// src/backend/models/postModel.js
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    userId: Number,
    content: String,
    createdAt: Date,
})

// Usamos una función para registrar el modelo en la conexión correcta
export default function createPostModel(connection) {
    return connection.models.Post || connection.model('Post', postSchema)
}