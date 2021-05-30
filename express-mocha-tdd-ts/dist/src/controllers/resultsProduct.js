"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsProduct = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const model_product_1 = tslib_1.__importDefault(require("../models/model.product"));
const resultsProduct = async (req, res, next) => {
    try {
        const checkProductExists = await model_product_1.default.find({});
        if (checkProductExists.length < 1) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                type: 'Results Product',
                status: res.statusCode,
                message: 'products is not exist'
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            type: 'Results Product',
            message: 'products already to use',
            products: checkProductExists
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'Results Product',
            status: res.statusCode,
            message: err.message || 'internal server error'
        });
    }
};
exports.resultsProduct = resultsProduct;
//# sourceMappingURL=resultsProduct.js.map