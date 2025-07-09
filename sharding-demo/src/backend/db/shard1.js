// src/backend/db/shard1.js
import mongoose from 'mongoose'

const shard1 = await mongoose.createConnection('mongodb://localhost:27017/shard1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

shard1.name = 'shard1'

export default shard1