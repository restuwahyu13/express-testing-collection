const chai = require('chai')
const sinon = require('sinon')
const httpMock = require('node-mocks-http')
const { productCreate, productResults, productResult } = require('../mock-data/fakeData')
const { productModel } = require('../../models/model.product')
const { addProduct } = require('../../controllers/addProduct')
const { resultsProduct } = require('../../controllers/resultsProduct')
const { resultProductById } = require('../../controllers/resultProductById')
const { deleteProductById } = require('../../controllers/deleteProduct')
const { updateProduct } = require('../../controllers/updateProduct')

let req, res, next, mock

describe('[Unit Testing] - Product Controller', function () {
	beforeEach(function () {
		// create model mock
		mock = sinon.mock(productModel)

		// create express request and response mock
		req = httpMock.createRequest()
		res = httpMock.createResponse()
		next = sinon.spy()
	})

	afterEach(function () {
		// reset mock after each test finish
		mock.verify()
		mock.restore()
	})

	it('add new product', async function () {
		mock.expects('create').resolves(productCreate)

		await addProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(201)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('add new product successfully')
	})

	it('add new product failed', async function () {
		mock.expects('create').resolves(null)

		await addProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(403)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('add new product failed')
	})

	it('add new product conflict', async function () {
		mock.expects('findOne').resolves(productCreate)

		await addProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(409)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('product name already exist')
	})

	it('results product', async function () {
		mock.expects('find').resolves(productResults)

		await resultsProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(200)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('products already to use')
		chai.expect(data.products).to.be.deep.equal(productResults)
	})

	it('results products failed', async function () {
		mock.expects('find').resolves([])

		await resultsProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(404)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('products is not exist')
	})

	it('result product', async function () {
		mock.expects('findOne').resolves(productResult)

		await resultProductById(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(200)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('product already to use')
		chai.expect(data.product).to.be.deep.equal(productResult)
	})

	it('result product failed', async function () {
		mock.expects('findOne').resolves(null)

		await resultProductById(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(404)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('product is not exist')
	})

	it('delete product', async function () {
		mock.expects('findByIdAndDelete').resolves(true)

		await deleteProductById(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(200)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('delete product successfully')
	})

	it('delete product failed', async function () {
		mock.expects('findByIdAndDelete').resolves(false)

		await deleteProductById(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(404)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('product is not exist or deleted from owner')
	})

	it('update product', async function () {
		mock.expects('findByIdAndUpdate').resolves(true)

		await updateProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(200)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('update product successfully')
	})

	it('update product failed', async function () {
		mock.expects('findByIdAndUpdate').resolves(false)

		await updateProduct(req, res, next)
		const data = res._getJSONData()

		chai.expect(res._isEndCalled()).to.be.true
		chai.expect(res._getStatusCode()).to.be.equal(404)
		chai.expect(res._getHeaders()).to.be.contain({ 'content-type': 'application/json' })
		chai.expect(data.message).to.be.equal('product is not exist or deleted from owner')
	})
})
