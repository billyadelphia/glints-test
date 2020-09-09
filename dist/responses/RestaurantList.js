"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantDataList = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
class RestaurantDataList {
}
tslib_1.__decorate([
    common_1.Property(),
    common_1.Title("iD"),
    common_1.Description("Description of calendar model id"),
    common_1.Example("Description example"),
    tslib_1.__metadata("design:type", Number)
], RestaurantDataList.prototype, "id", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], RestaurantDataList.prototype, "cashBalance", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", String)
], RestaurantDataList.prototype, "restaurantName", void 0);
exports.RestaurantDataList = RestaurantDataList;
class RestaurantList {
    constructor() {
        this.status = 200;
    }
}
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", Array)
], RestaurantList.prototype, "data", void 0);
tslib_1.__decorate([
    common_1.Property(),
    tslib_1.__metadata("design:type", Object)
], RestaurantList.prototype, "meta", void 0);
tslib_1.__decorate([
    common_1.Property(),
    common_1.Example("Description example"),
    tslib_1.__metadata("design:type", Number)
], RestaurantList.prototype, "status", void 0);
exports.default = RestaurantList;
//# sourceMappingURL=RestaurantList.js.map