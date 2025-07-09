// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form')
    const getForm = document.getElementById('get-form')
    const resultDiv = document.getElementById('result')

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const userId = Number(document.getElementById('userId').value)
        const content = document.getElementById('content').value

        const res = await fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, content }),
        })

        const data = await res.json()
        alert(`✅ Post creado en ${data.shard}`)
        postForm.reset()
    })

    getForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const userId = Number(document.getElementById('queryUserId').value)

        const res = await fetch(`http://localhost:3001/api/posts?userId=${userId}`)
        const data = await res.json()

        const shardColor = data.shard === 'shard0' ? '#d1e7dd' : '#f8d7da'

        resultDiv.innerHTML = `
        <div style="padding: 10px; background-color: ${shardColor}; border-radius: 8px;">
            <h3>📦 Shard: ${data.shard}</h3>
            <ul>
            ${data.posts
                .map(
                (post) =>
                    `<li><strong>${post.content}</strong> <small>(${new Date(post.createdAt).toLocaleString()})</small></li>`
                )
                .join('')}
            </ul>
        </div>
        `

    })

    document.getElementById('count-btn').addEventListener('click', async () => {
        let counts = { shard0: 0, shard1: 0 }

        for (let i = 0; i <= 100; i++) {
            const res = await fetch(`http://localhost:3001/api/posts?userId=${i}`)
            if (!res.ok) continue
            const data = await res.json()
            if (data.shard && data.posts?.length) {
            counts[data.shard] += data.posts.length
            }
        }

        document.getElementById('shard-stats').innerHTML = `
            <h4>Distribución actual:</h4>
            <ul>
            <li>🟢 Shard0: ${counts.shard0} posts</li>
            <li>🔴 Shard1: ${counts.shard1} posts</li>
            </ul>
    `
    })

    document.getElementById('load-btn').addEventListener('click', async () => {
        const results = { shard0: 0, shard1: 0 }

        for (let i = 0; i < 100; i++) {
            const userId = Math.floor(Math.random() * 100)
            const res = await fetch('http://localhost:3001/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                content: `Carga aleatoria #${i + 1}`,
            }),
            })

            const data = await res.json()
            results[data.shard] += 1
        }

        alert(`✅ Carga completada.\nShard0: ${results.shard0} posts\nShard1: ${results.shard1} posts`)
    })
})