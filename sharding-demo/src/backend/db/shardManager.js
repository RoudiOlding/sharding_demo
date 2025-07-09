// src/backend/db/shardManager.js
import shard0 from './shard0.js'
import shard1 from './shard1.js'

const shards = [shard0, shard1]

export function getShardConnection(userId) {
    const shardIndex = userId % shards.length
    return shards[shardIndex]
}