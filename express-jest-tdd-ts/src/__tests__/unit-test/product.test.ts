import httpMock from 'node-mocks-http'
import { productCreate, productResults, productResult } from '../mock-data/fakeData'
import productModel from '../../models/model.product'
import { addProduct } from '../../controllers/addProduct'
import { resultsProduct } from '../../controllers/resultsProduct'
import { resultProductById } from '../../controllers/resultProductById'
import { deleteProductById } from '../../controllers/deleteProduct'
import { updateProduct } from '../../controllers/updateProduct'
import { ProductDTO } from '../../dto/dto.product'

let req, res, next, mock

// create mocking for database
jest.mock('../../models/model.product')

describe('[Unit Testing] - Product Controller', function () {
	beforeEach(function () {
		// setup mocking for mongoose model
		mock = productModel

		// create express request and response mock
		req = httpMock.createRequest()
		res = httpMock.createResponse()
		next = jest.fn()
	})

	it('add new product', async function (done) {
		mock.create.mockReturnValue(productCreate)
		await addProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'create')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.create(productCreate))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(201)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('add new product successfully')
		done()
	})

	it('add new product failed', async function (done) {
		mock.create.mockReturnValue(null)
		await addProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'create')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.create(null))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(403)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('add new product failed')
		done()
	})

	it('add new product conflict', async function (done) {
		mock.findOne.mockReturnValue(productCreate)
		await addProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findOne')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(productCreate))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(409)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product name already exist')
		done()
	})

	it('results product', async function (done) {
		mock.find.mockReturnValue(productResults)
		await resultsProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'find')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.find(productResults))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(200)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('products already to use')
		expect(data.products).toStrictEqual(productResults)
		done()
	})

	it('results products failed', async function (done) {
		mock.find.mockReturnValue([])
		await resultsProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'find')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.find([]))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(404)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('products is not exist')
		done()
	})

	it('result product', async function (done) {
		mock.findOne.mockReturnValue(productResult)
		await resultProductById(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findOne')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(productResult))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(200)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product already to use')
		expect(data.product).toStrictEqual(productResult)
		done()
	})

	it('result product failed', async function (done) {
		mock.findOne.mockReturnValue(undefined)
		await resultProductById(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findOne')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(undefined))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(404)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product is not exist')
		done()
	})

	it('delete product', async function (done) {
		mock.findByIdAndDelete.mockReturnValue(true)
		await deleteProductById(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findByIdAndDelete')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndDelete(true))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(200)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('delete product successfully')
		done()
	})

	it('delete product failed', async function (done) {
		mock.findByIdAndDelete.mockReturnValue(false)
		await deleteProductById(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findByIdAndDelete')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndDelete(false))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(404)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product is not exist or deleted from owner')
		done()
	})

	it('update product', async function (done) {
		mock.findByIdAndUpdate.mockReturnValue(true)
		await updateProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findByIdAndUpdate')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndUpdate(true))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(200)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('update product successfully')
		done()
	})

	it('update product failed', async function (done) {
		mock.findByIdAndUpdate.mockReturnValue(false)
		await updateProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'findByIdAndUpdate')

		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndUpdate(false))

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(404)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product is not exist or deleted from owner')
		done()
	})
})
