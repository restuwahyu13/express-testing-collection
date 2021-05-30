"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const router = express_1.default.Router();
const addProduct_1 = require("../controllers/addProduct");
const resultsProduct_1 = require("../controllers/resultsProduct");
const resultProductById_1 = require("../controllers/resultProductById");
const deleteProduct_1 = require("../controllers/deleteProduct");
const updateProduct_1 = require("../controllers/updateProduct");
router.post('/product', addProduct_1.addProduct);
router.get('/products', resultsProduct_1.resultsProduct);
router.get('/product/:id', resultProductById_1.resultProductById);
router.delete('/product/:id', deleteProduct_1.deleteProductById);
router.put('/product/:id', updateProduct_1.updateProduct);
exports.default = router;
//# sourceMappingURL=route.product.js.map