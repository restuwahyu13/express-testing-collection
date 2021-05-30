import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import productModel from '../models/model.product'

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response<any>> => {
	try {
		const updateProduct = await productModel.findByIdAndUpdate(req.params.id, {
			name: req.body.name,
			quantity: req.body.quantity,
			price: req.body.price,
			category: req.body.category,
			updatedAt: new Date()
		})

		if (!updateProduct) {
			return res.status(StatusCodes.NOT_FOUND).json({
				type: 'Update Product',
				status: res.statusCode,
				message: 'product is not exist or deleted from owner'
			})
		}

		return res.status(StatusCodes.OK).json({
			type: 'Update Product',
			message: 'update product successfully'
		})
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			type: 'Update Product',
			status: res.statusCode,
			message: err.message || 'internal server error'
		})
	}
}
