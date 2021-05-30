"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'product name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'product quantity is required']
    },
    price: {
        type: Number,
        required: [true, 'product price is required']
    },
    category: {
        type: String,
        trim: true,
        required: [true, 'product category is required']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});
exports.default = mongoose_1.default.model('products', Schema);
//# sourceMappingURL=model.product.js.map