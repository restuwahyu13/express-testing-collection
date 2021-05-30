"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const model_product_1 = tslib_1.__importDefault(require("../models/model.product"));
const updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await model_product_1.default.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            updatedAt: new Date()
        });
        if (!updateProduct) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                type: 'Update Product',
                status: res.statusCode,
                message: 'product is not exist or deleted from owner'
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            type: 'Update Product',
            message: 'update product successfully'
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'Update Product',
            status: res.statusCode,
            message: err.message || 'internal server error'
        });
    }
};
exports.updateProduct = updateProduct;
//# sourceMappingURL=updateProduct.js.map