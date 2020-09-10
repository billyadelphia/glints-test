"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const RestaurantController_1 = require("./RestaurantController");
const RestaurantService_1 = require("../services/RestaurantService");
const restaurantController = new RestaurantController_1.default(new RestaurantService_1.default());
describe("RestaurantController", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    it("should call RestaurantController.list()", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = {
            day: 4,
            open: {
                from: "15:00",
                to: "18:09",
            },
            closed: {
                from: "17:09",
                to: "18:09",
            },
        };
        const controller = yield restaurantController.listByDay(data);
        chai_1.expect(controller).to.be.an("object");
    }));
    it("should call RestaurantController.list()", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const data = {
            by: "numberOfTransaction",
        };
        const controller = yield restaurantController.popular(data);
        chai_1.expect(controller).to.be.an("object");
    }));
}));
//# sourceMappingURL=RestaurantController.spec.js.map