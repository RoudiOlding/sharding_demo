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

        resultDiv.innerHTML = `
        <h3>📦 Shard: ${data.shard}</h3>
        <ul>
            ${data.posts
            .map((post) => `<li>${post.content} <small>(${new Date(post.createdAt).toLocaleString()})</small></li>`)
            .join('')}
        </ul>
        `
    })
})