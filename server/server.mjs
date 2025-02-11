import http from 'http'
import app from './app.mjs'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 8080

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})