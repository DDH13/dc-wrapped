import 'dotenv/config'
import express, { urlencoded, json } from 'express'
import cors from 'cors'
import debaterRouter from './routes/debaters.js'

const app = express()

app.use(cors())    
app.use(urlencoded({ extended: true }))
app.use(json())


app.use("/api/v1/debaters", debaterRouter)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

export default app;