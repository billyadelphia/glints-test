"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const exceptions_1 = require("@tsed/exceptions");
const response_1 = require("../helpers/response");
const sequelize_1 = require("sequelize");
let Exception = class Exception extends common_1.GlobalErrorHandlerMiddleware {
    use(error, request, response) {
        if (error instanceof exceptions_1.Exception) {
            return response.status(error.status).json(response_1.errorResponse(error.message, error.body ? error.body : {}, error.status));
        }
        if (error instanceof sequelize_1.ValidationError) {
            return response.status(422).json(response_1.errorValidationResponse(error));
        }
        return super.use(error, request, response);
    }
};
tslib_1.__decorate([
    tslib_1.__param(0, common_1.Err()), tslib_1.__param(1, common_1.Req()), tslib_1.__param(2, common_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Object)
], Exception.prototype, "use", null);
Exception = tslib_1.__decorate([
    common_1.OverrideProvider(common_1.GlobalErrorHandlerMiddleware)
], Exception);
exports.Exception = Exception;
//# sourceMappingURL=exception.js.map