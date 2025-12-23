import 'dotenv/config'
import express, { urlencoded, json } from 'express'
import cors from 'cors'
import debaterRouter from './routes/debaters.js'
import judgeRouter from './routes/judges.js'

const app = express()

app.use(cors())    
app.use(urlencoded({ extended: true }))
app.use(json())


app.use("/api/v1/debaters", debaterRouter)
app.use("/api/v1/judges", judgeRouter)

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;