const http = require('http')
const app = require('./app')
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
	if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test')
		console.log(`server is running on port ${process.env.PORT}`)
})
