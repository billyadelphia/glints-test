"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const UserController_1 = require("./UserController");
const UserService_1 = require("../services/UserService");
const userController = new UserController_1.default(new UserService_1.default());
describe("UserController", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    it("should call UserController.list()", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = {
            byTotalTransaction: {
                limit: 10,
                date: {
                    from: "2020-02-10",
                    to: "2020-04-03",
                },
            },
        };
        const controller = yield userController.list(data);
        chai_1.expect(controller).to.be.an("object");
    }));
    it("should call RestaurantController.list()", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = {
            data: {
                date: {
                    from: "2020-02-10",
                    to: "2020-12-12",
                },
                operator: ">",
                valueOfTransaction: 9,
            },
        };
        const controller = yield userController.total(data);
        chai_1.expect(controller).to.be.an("object");
    }));
}));
//# sourceMappingURL=UserController.spec.js.map