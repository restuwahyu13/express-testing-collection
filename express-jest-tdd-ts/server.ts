import http, { Server } from 'http'
import app from './src/app'

const server = http.createServer(app) as Server

server.listen(process.env.PORT, () => {
	if (process.env.NODE_ENV !== ('production' || 'test')) {
		console.log(`server is running on port ${process.env.PORT}`)
	}
})
