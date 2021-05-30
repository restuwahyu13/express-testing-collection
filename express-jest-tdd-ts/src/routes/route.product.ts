import express, { Router } from 'express'
const router = express.Router() as Router
import { addProduct } from '../controllers/addProduct'
import { resultsProduct } from '../controllers/resultsProduct'
import { resultProductById } from '../controllers/resultProductById'
import { deleteProductById } from '../controllers/deleteProduct'
import { updateProduct } from '../controllers/updateProduct'

router.post('/product', addProduct)
router.get('/products', resultsProduct)
router.get('/product/:id', resultProductById)
router.delete('/product/:id', deleteProductById)
router.put('/product/:id', updateProduct)

export default router
