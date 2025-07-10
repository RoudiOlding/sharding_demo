import express from 'express'
import cors from 'cors'
import postsRouter from './routes/posts.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())
app.use('/api/posts', postsRouter)

app.listen(PORT, () => {
    console.log(`🧩 Backend API escuchando en http://localhost:${PORT}`)
})