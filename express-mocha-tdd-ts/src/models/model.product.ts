import mongoose from 'mongoose'
import { ProductDTO } from '../dto/dto.product'

const Schema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		trim: true,
		required: [true, 'product name is required']
	},
	quantity: {
		type: Number,
		required: [true, 'product quantity is required']
	},
	price: {
		type: Number,
		required: [true, 'product price is required']
	},
	category: {
		type: String,
		trim: true,
		required: [true, 'product category is required']
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	}
})

export default mongoose.model<ProductDTO>('products', Schema)
