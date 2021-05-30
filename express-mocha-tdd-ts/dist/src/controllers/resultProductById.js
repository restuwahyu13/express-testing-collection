"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultProductById = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const model_product_1 = tslib_1.__importDefault(require("../models/model.product"));
const resultProductById = async (req, res, next) => {
    try {
        const checkProductExist = await model_product_1.default.findOne({ _id: req.params.id });
        if (!checkProductExist) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                type: 'Result Product',
                status: res.statusCode,
                message: 'product is not exist'
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            type: 'Result Product',
            message: 'product already to use',
            product: checkProductExist
        });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            type: 'Result Product',
            status: res.statusCode,
            message: err.message || 'internal server error'
        });
    }
};
exports.resultProductById = resultProductById;
//# sourceMappingURL=resultProductById.js.map