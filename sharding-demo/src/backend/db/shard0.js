// src/backend/db/shard0.js
import mongoose from 'mongoose'

const shard0 = await mongoose.createConnection('mongodb://localhost:27017/shard0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

shard0.name = 'shard0'

export default shard0