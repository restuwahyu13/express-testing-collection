const express = require('express')
const router = express.Router()
const { addProduct } = require('../controllers/addProduct')
const { resultsProduct } = require('../controllers/resultsProduct')
const { resultProductById } = require('../controllers/resultProductById')
const { deleteProductById } = require('../controllers/deleteProduct')
const { updateProduct } = require('../controllers/updateProduct')

router.post('/product', addProduct)
router.get('/products', resultsProduct)
router.get('/product/:id', resultProductById)
router.delete('/product/:id', deleteProductById)
router.put('/product/:id', updateProduct)

module.exports = router
