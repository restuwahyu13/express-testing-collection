const { StatusCodes } = require('http-status-codes')
const { productModel } = require('../models/model.product')

exports.resultProductById = async (req, res, next) => {
	try {
		const checkProductExist = await productModel.findOne({ _id: req.params.id })

		if (!checkProductExist) {
			return res.status(StatusCodes.NOT_FOUND).json({
				type: 'Result Product',
				status: res.statusCode,
				message: 'product is not exist'
			})
		}

		return res.status(StatusCodes.OK).json({
			type: 'Result Product',
			message: 'product already to use',
			product: checkProductExist
		})
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			type: 'Result Product',
			status: res.statusCode,
			message: err.message || 'internal server error'
		})
	}
}
