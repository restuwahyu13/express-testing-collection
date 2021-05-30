"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("dotenv/config");
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const q_1 = tslib_1.__importDefault(require("q"));
const zlib_1 = tslib_1.__importDefault(require("zlib"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const route_product_1 = tslib_1.__importDefault(require("./routes/route.product"));
mongoose_1.default.Promise = q_1.default.Promise;
const databaseHost = process.env.NODE_ENV != 'test' ? process.env.MONGO_URI || '' : process.env.MONGO_URI_TEST || '';
mongoose_1.default
    .connect(databaseHost, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10
})
    .then(() => {
    if (process.env.NODE_ENV !== ('production' || 'test')) {
        console.log('database is connected');
    }
})
    .catch(() => {
    if (process.env.NODE_ENV !== ('production' || 'test')) {
        console.log('database is not connected');
    }
});
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(compression_1.default({
    level: zlib_1.default.constants.Z_BEST_COMPRESSION,
    strategy: zlib_1.default.constants.Z_RLE
}));
if (process.env.NODE_ENV !== 'production')
    app.use(morgan_1.default('dev'));
app.use('/api/v1', route_product_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map