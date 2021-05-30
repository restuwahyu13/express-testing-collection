"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const app_1 = tslib_1.__importDefault(require("./src/app"));
const server = http_1.default.createServer(app_1.default);
server.listen(process.env.PORT, () => {
    if (process.env.NODE_ENV !== ('production' || 'test')) {
        console.log(`server is running on port ${process.env.PORT}`);
    }
});
//# sourceMappingURL=server.js.map