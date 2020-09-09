"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const TransactionService_1 = require("../services/TransactionService");
const response_1 = require("../helpers/response");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    buy(req, listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.transactionService.buy(listParam);
            return response_1.response({ transaction: list });
        });
    }
};
tslib_1.__decorate([
    common_1.Post("/buy"),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams("data")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "buy", null);
TransactionController = tslib_1.__decorate([
    common_1.Controller("/transaction"),
    tslib_1.__metadata("design:paramtypes", [TransactionService_1.default])
], TransactionController);
exports.default = TransactionController;
//# sourceMappingURL=TransactionController.js.map