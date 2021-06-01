const { StatusCodes } = require('http-status-codes')
const { productModel } = require('../models/model.product')

exports.addProduct = async (req, res, next) => {
	try {
		const checkProductExist = await productModel.findOne({ name: req.body.name }).lean()

		if (checkProductExist) {
			return res.status(StatusCodes.CONFLICT).json({
				type: 'Add Product',
				status: res.statusCode,
				message: 'product name already exist'
			})
		}

		const addNewProduct = await productModel.create({
			name: req.body.name,
			quantity: req.body.quantity,
			price: req.body.price,
			category: req.body.category,
			createdAt: new Date()
		})

		if (!addNewProduct) {
			return res.status(StatusCodes.FORBIDDEN).json({
				type: 'Add Product',
				status: res.statusCode,
				message: 'add new product failed'
			})
		}

		return res.status(StatusCodes.CREATED).json({
			type: 'Add Product',
			message: 'add new product successfully'
		})
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			type: 'Add Product',
			status: res.statusCode,
			message: err.message || 'internal server error'
		})
	}
}
