const httpMock = require('node-mocks-http')
const { productCreate, productResults, productResult } = require('../mock-data/fakeData')
const { productModel } = require('../../models/model.product')
const { addProduct } = require('../../controllers/addProduct')
const { resultsProduct } = require('../../controllers/resultsProduct')
const { resultProductById } = require('../../controllers/resultProductById')
const { deleteProductById } = require('../../controllers/deleteProduct')
const { updateProduct } = require('../../controllers/updateProduct')

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

		expect(jest.isMockFunction(productModel.create)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.create(productCreate))
		expect(mockSpy.mock.results[0].value).toStrictEqual(productCreate)

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(201)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('add new product successfully')
		done()
	})

	it('add new product failed', async function (done) {
		mock.create.mockReturnValue(undefined)
		await addProduct(req, res, next)

		const data = res._getJSONData()
		const mockSpy = jest.spyOn(productModel, 'create')

		expect(jest.isMockFunction(productModel.create)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.create(undefined))
		expect(mockSpy.mock.results[0].value).toStrictEqual(undefined)

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

		expect(jest.isMockFunction(productModel.findOne)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(productCreate))
		expect(mockSpy.mock.results[0].value).toStrictEqual(productCreate)

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

		expect(jest.isMockFunction(productModel.find)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.find(productResults))
		expect(mockSpy.mock.results[0].value).toStrictEqual(productResults)

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

		expect(jest.isMockFunction(productModel.find)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.find([]))
		expect(mockSpy.mock.results[0].value).toStrictEqual([])

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

		expect(jest.isMockFunction(productModel.findOne)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(productResult))
		expect(mockSpy.mock.results[0].value).toStrictEqual(productResult)

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

		expect(jest.isMockFunction(productModel.findOne)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findOne(undefined))
		expect(mockSpy.mock.results[0].value).toStrictEqual(undefined)

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

		expect(jest.isMockFunction(productModel.findByIdAndDelete)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndDelete(true))
		expect(mockSpy.mock.results[0].value).toStrictEqual(true)

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

		expect(jest.isMockFunction(productModel.findByIdAndDelete)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndDelete(false))
		expect(mockSpy.mock.results[0].value).toStrictEqual(false)

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

		expect(jest.isMockFunction(productModel.findByIdAndDelete)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndUpdate(true))
		expect(mockSpy.mock.results[0].value).toStrictEqual(true)

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

		expect(jest.isMockFunction(productModel.findByIdAndUpdate)).toBeTruthy()
		expect(mockSpy).toHaveBeenCalled()
		expect(mockSpy).toHaveBeenCalledTimes(1)
		expect(mockSpy).toHaveBeenCalledWith(productModel.findByIdAndUpdate(false))
		expect(mockSpy.mock.results[0].value).toStrictEqual(false)

		expect(res._isEndCalled()).toBeTruthy()
		expect(res._getStatusCode()).toBe(404)
		expect(res._getHeaders()).toMatchObject({ 'content-type': 'application/json' })
		expect(data.message).toBe('product is not exist or deleted from owner')
		done()
	})
})
