import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import productModel from '../models/model.product'

export const resultsProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response<any>> => {
	try {
		const checkProductExists = await productModel.find({}).lean()

		if (checkProductExists.length < 1) {
			return res.status(StatusCodes.NOT_FOUND).json({
				type: 'Results Product',
				status: res.statusCode,
				message: 'products is not exist'
			})
		}

		return res.status(StatusCodes.OK).json({
			type: 'Results Product',
			message: 'products already to use',
			products: checkProductExists
		})
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			type: 'Results Product',
			status: res.statusCode,
			message: err.message || 'internal server error'
		})
	}
}
