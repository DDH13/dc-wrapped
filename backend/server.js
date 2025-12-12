import 'dotenv/config'
import express, { urlencoded, json } from 'express'
import debaterRouter from './routes/debaters.js'

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())


app.use("/api/v1/debaters", debaterRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})