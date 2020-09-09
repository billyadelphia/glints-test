"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("../config/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const UserPurchaseHistory_1 = require("./UserPurchaseHistory");
let User = class User extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
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
], User.prototype, "cashBalance", void 0);
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
], User.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => UserPurchaseHistory_1.default, { foreignKey: "userId", as: "purchaseHistories" }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "purchaseHistories", void 0);
User = tslib_1.__decorate([
    sequelize_typescript_1.Table({ tableName: "Users" })
], User);
exports.userModel = User;
sequelize_1.default.addModels([User]);
exports.default = User;
//# sourceMappingURL=User.js.map