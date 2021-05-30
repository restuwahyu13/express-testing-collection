"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const model_product_1 = tslib_1.__importDefault(require("../models/model.product"));
const addProduct = async (req, res, next) => {
    try {
        const checkProductExist = await model_product_1.default.findOne({ name: req.body.name });
        if (checkProductExist) {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                type: 'Add Product',
                status: res.statusCode,
                message: 'product name already exist'
            });
        }
        const addNewProduct = await model_product_1.default.create({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            createdAt: new Date()
        });
        if (!addNewProduct) {
            return res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
                type: 'Add Product',
                status: res.statusCode,
                message: 'add new product failed'
            });
        }
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            type: 'Add Product',
            message: 'add new product successfully'
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'Add Product',
            status: res.statusCode,
            message: err.message || 'internal server error'
        });
    }
};
exports.addProduct = addProduct;
//# sourceMappingURL=addProduct.js.map