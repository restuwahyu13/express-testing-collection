"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const model_product_1 = tslib_1.__importDefault(require("../models/model.product"));
const deleteProductById = async (req, res, next) => {
    try {
        const deleteProduct = await model_product_1.default.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                type: 'Delete Product',
                status: res.statusCode,
                message: 'product is not exist or deleted from owner'
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            type: 'Delete Product',
            message: 'delete product successfully'
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'Delete Product',
            status: res.statusCode,
            message: err.message || 'internal server error'
        });
    }
};
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=deleteProduct.js.map