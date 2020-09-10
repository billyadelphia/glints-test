"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const UserService_1 = require("../services/UserService");
const response_1 = require("../helpers/response");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    list(listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.userService.list(listParam);
            return response_1.response({ users: list });
        });
    }
    total(listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const list = yield this.userService.totalUser(listParam);
            return response_1.response({ users: list });
        });
    }
};
tslib_1.__decorate([
    common_1.Post("/list"),
    tslib_1.__param(0, common_1.BodyParams("data")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "list", null);
tslib_1.__decorate([
    common_1.Post("/total"),
    tslib_1.__param(0, common_1.BodyParams("data")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "total", null);
UserController = tslib_1.__decorate([
    common_1.Controller("/user"),
    tslib_1.__metadata("design:paramtypes", [UserService_1.default])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map