"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPurchaseHistoryModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("../config/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let UserPurchaseHistory = class UserPurchaseHistory extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], UserPurchaseHistory.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", Number)
], UserPurchaseHistory.prototype, "userId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(16, 2),
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], UserPurchaseHistory.prototype, "transactionAmount", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], UserPurchaseHistory.prototype, "dishName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], UserPurchaseHistory.prototype, "restaurantName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], UserPurchaseHistory.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], UserPurchaseHistory.prototype, "updatedAt", void 0);
UserPurchaseHistory = tslib_1.__decorate([
    sequelize_typescript_1.Table({ tableName: "UserPurchaseHistories" })
], UserPurchaseHistory);
exports.userPurchaseHistoryModel = UserPurchaseHistory;
sequelize_1.default.addModels([UserPurchaseHistory]);
exports.default = UserPurchaseHistory;
//# sourceMappingURL=UserPurchaseHistory.js.map