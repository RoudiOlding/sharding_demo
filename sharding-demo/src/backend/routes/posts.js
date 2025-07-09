// src/backend/routes/posts.js
import express from 'express'
import { getShardConnection } from '../db/shardManager.js'
import createPostModel from '../models/postModel.js'

const router = express.Router()

// Crear un nuevo post
router.post('/', async (req, res) => {
    const { userId, content } = req.body
    if (!userId || !content) return res.status(400).json({ error: 'Faltan campos' })

    const conn = getShardConnection(userId)
    const Post = createPostModel(conn)

    const newPost = new Post({ userId, content, createdAt: new Date() })
    await newPost.save()
    res.status(201).json({ msg: 'Post creado', shard: conn.name })
})

// Obtener posts de un usuario
router.get('/', async (req, res) => {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ error: 'Falta userId' })

    const conn = getShardConnection(userId)
    const Post = createPostModel(conn)

    const posts = await Post.find({ userId }).sort({ createdAt: -1 })
    res.json({ shard: conn.name, posts })
})

export default router