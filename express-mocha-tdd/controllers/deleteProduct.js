const { StatusCodes } = require('http-status-codes')
const { productModel } = require('../models/model.product')

exports.deleteProductById = async (req, res, next) => {
	try {
		const deleteProduct = await productModel.findByIdAndDelete(req.params.id).lean()

		if (!deleteProduct) {
			return res.status(StatusCodes.NOT_FOUND).json({
				type: 'Delete Product',
				status: res.statusCode,
				message: 'product is not exist or deleted from owner'
			})
		}

		return res.status(StatusCodes.OK).json({
			type: 'Delete Product',
			message: 'delete product successfully'
		})
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			type: 'Delete Product',
			status: res.statusCode,
			message: err.message || 'internal server error'
		})
	}
}
