import 'dotenv/config'
import express, { Express } from 'express'
import mongoose from 'mongoose'
import q from 'q'
import zlib from 'zlib'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'

/**
 * @description init all endpoint route app
 */
import routeProduct from './routes/route.product'

/**
 * @description setup global promise for mongoose
 */
mongoose.Promise = q.Promise

/**
 * @description setup database connection
 */
const databaseHost: string = process.env.NODE_ENV != 'test' ? process.env.MONGO_URI || '' : process.env.MONGO_URI_TEST || ''
mongoose
	.connect(databaseHost, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
		poolSize: 10
	})
	.then(() => {
		if (process.env.NODE_ENV !== ('production' || 'test')) {
			console.log('database is connected')
		}
	})
	.catch(() => {
		if (process.env.NODE_ENV !== ('production' || 'test')) {
			console.log('database is not connected')
		}
	})

/**
 * @description initialize application
 */
const app = express() as Express

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

export default app
