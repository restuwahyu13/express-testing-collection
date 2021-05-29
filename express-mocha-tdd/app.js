require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const zlib = require('zlib')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')

/**
 * @description init all endpoint route app
 */
const routeProduct = require('./routes/route.product')

/**
 * @description setup global promise for mongoose
 */
mongoose.Promise = global.Promise

/**
 * @description setup database connection
 */
const databaseHost = process.env.NODE_ENV != 'test' ? process.env.MONGO_URI : process.env.MONGO_URI_TEST
mongoose
	.connect(databaseHost, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
		poolSize: 10
	})
	.then(() => {
		if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
			console.log('database is connected')
		}
	})
	.catch(() => {
		if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test') {
			console.log('database is not connected')
		}
	})

/**
 * @description initialize application
 */
const app = express()

/**
 * @description setup all plugin middleware for app
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(
	compression({
		level: zlib.constants.Z_BEST_COMPRESSION,
		strategy: zlib.constants.Z_RLE
	})
)
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

/**
 * @description setup endpoint route app
 */
app.use('/api/v1', routeProduct)

module.exports = app
