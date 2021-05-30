import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import productModel from '../models/model.product'

export const resultProductById = async (req: Request, res: Response, next: NextFunction): Promise<Response<any>> => {
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
