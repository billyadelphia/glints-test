"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const RestaurantService_1 = require("../services/RestaurantService");
const response_1 = require("../helpers/response");
let RestaurantController = class RestaurantController {
    constructor(restaurantService) {
        this.restaurantService = restaurantService;
    }
    listByDay(req, listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.restaurantService.list(listParam);
            return response_1.response({ restaurants: list });
        });
    }
    popular(req, listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.restaurantService.popularRestaurant(listParam);
            return response_1.response({ restaurants: list });
        });
    }
};
tslib_1.__decorate([
    common_1.Post("/list"),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams("data")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "listByDay", null);
tslib_1.__decorate([
    common_1.Post("/list-popular-restaurants"),
    tslib_1.__param(0, common_1.Req()), tslib_1.__param(1, common_1.BodyParams("data")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RestaurantController.prototype, "popular", null);
RestaurantController = tslib_1.__decorate([
    common_1.Controller("/restaurant"),
    tslib_1.__metadata("design:paramtypes", [RestaurantService_1.default])
], RestaurantController);
exports.default = RestaurantController;
//# sourceMappingURL=RestaurantController.js.map