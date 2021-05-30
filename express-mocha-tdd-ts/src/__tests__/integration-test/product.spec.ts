import chai from 'chai'
import chaiHttp from 'chai-http'
import faker from 'faker'
import { isType } from 'is-any-type'
import app from '../../app'
import productModel from '../../models/model.product'

let data, id

// setup middleware chai
chai.use(chaiHttp)

describe('[Integration Testing] - Product Controller', function () {
	before(function () {
		data = {
			name: faker.commerce.productName(),
			price: Math.abs(parseInt(faker.commerce.price(1000, 30000))),
			quantity: faker.random.number(),
			category: faker.commerce.product()
		}
	})

	after(function () {
		// cleanup data after all test finish
		data = {}
		// cleanup specific collection after all test finish
		productModel.db.dropCollection('products')
	})

	it('add new product', async function () {
		const res = await chai.request(app).post('/api/v1/product').set({ 'Content-Type': 'application/json' }).send(data)

		chai.expect(res.status).to.be.equal(201)
		chai.expect(res.get('Content-Type')).to.be.match(/json/)
		chai.expect(res.body.message).to.be.equal('add new product successfully')
	})

	it('results product', async function () {
		const res = await chai.request(app).get('/api/v1/products').set({ 'Content-Type': 'application/json' })

		chai.expect(res.status).to.be.equal(200)
		chai.expect(res.get('Content-Type')).to.be.match(/json/)
		chai.expect(res.body.message).to.be.equal('products already to use')
		chai.expect(isType(res.body.products)).to.be.equal('array')
		id = res.body.products[0]._id
	})

	it('result product', async function () {
		const res = await chai
			.request(app)
			.get('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })

		chai.expect(res.status).to.be.equal(200)
		chai.expect(res.get('Content-Type')).to.be.match(/json/)
		chai.expect(res.body.message).to.be.equal('product already to use')
		chai.expect(isType(res.body.product)).to.be.equal('object')
	})

	it('update product', async function () {
		const res = await chai
			.request(app)
			.put('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })
			.send(data)

		chai.expect(res.status).to.be.equal(200)
		chai.expect(res.get('Content-Type')).to.be.match(/json/)
		chai.expect(res.body.message).to.be.equal('update product successfully')
	})

	it('delete product', async function () {
		const res = await chai
			.request(app)
			.delete('/api/v1/product/' + id)
			.set({ 'Content-Type': 'application/json' })

		chai.expect(res.status).to.be.equal(200)
		chai.expect(res.get('Content-Type')).to.be.match(/json/)
		chai.expect(res.body.message).to.be.equal('delete product successfully')
	})
})
