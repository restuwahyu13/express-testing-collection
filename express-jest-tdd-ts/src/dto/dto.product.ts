import { Document } from 'mongoose'

export interface ProductDTO extends Document {
	readonly _id?: any
	readonly name: string
	readonly quantity: number
	readonly price: number
	readonly category: string
	readonly createdAt?: Date
	readonly updatedAt?: Date
}
