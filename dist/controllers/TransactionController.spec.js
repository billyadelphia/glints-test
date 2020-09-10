"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const TransactionController_1 = require("./TransactionController");
const TransactionService_1 = require("../services/TransactionService");
const transactionController = new TransactionController_1.default(new TransactionService_1.default());
describe("TransactionController", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    it("should call TransactionController.buy()", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = {
            userId: 1,
            restaurantId: 1,
            menuId: 1,
        };
        const controller = yield transactionController.buy(data);
        chai_1.expect(controller).to.be.an("object");
    }));
}));
//# sourceMappingURL=TransactionController.spec.js.map