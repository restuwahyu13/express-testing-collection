const request = require('supertest')
const faker = require('faker')
const { isType } = require('is-any-type')
const app = require('../../app')
const { productModel } = require('../../models/model.product')

let data, id

describe('[Integration Testing] - Product Controller', () => {
	beforeAll(() => {
		data = {
			name: faker.commerce.productName(),
			price: Math.abs(parseInt(faker.commerce.price(1000, 30000))),
			quantity: faker.random.number(),
			category: faker.commerce.product()
		}
	})

	afterAll(() => {
		// cleanup data after all test finish
		data = {}
		// cleanup specific collection after all test finish
		productModel.db.dropCollection('products')
	})

	it('add new product', async (done) => {
		const res = await request(app).post('/api/v1/product').set({ 'Content-Type': 'application/json' }).send(data)

		expect(res.statusCode).toBe(201)
		expect(res.get('Content-Type')).toMatch(/json/)
		expect(res.body.message).toBe('add new product successfully')
		done()
	})

	it('results product', async (done) => {
		const res = await request(app).get('/api/v1/products').set({ 'Content-Type': 'application/json' })

		expect(res.statusCode).toBe(200)
		expect(res.get('Content-Type')).toMatch(/json/)
		expect(res.body.message).toBe('products already to use')
		expect(isType(res.body.products)).toBe('array')
		id = res.body.products[0]._id
		done()
	})

	it('result product', async (done) => {
		const res = await request(app)
			.get('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })

		expect(res.statusCode).toBe(200)
		expect(res.get('Content-Type')).toMatch(/json/)
		expect(res.body.message).toBe('product already to use')
		expect(isType(res.body.product)).toBe('object')
		done()
	})

	it('update product', async (done) => {
		const res = await request(app)
			.put('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })
			.send(data)

		expect(res.statusCode).toBe(200)
		expect(res.get('Content-Type')).toMatch(/json/)
		expect(res.body.message).toBe('update product successfully')
		done()
	})

	it('delete product', async (done) => {
		const res = await request(app)
			.delete('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })

		expect(res.statusCode).toBe(200)
		expect(res.get('Content-Type')).toMatch(/json/)
		expect(res.body.message).toBe('delete product successfully')
		done()
	})
})
