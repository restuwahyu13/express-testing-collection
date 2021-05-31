const mongoose = require('mongoose')
const Schema = mongoose.Schema({
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

const productModel = mongoose.model('products', Schema)
module.exports = { productModel }
