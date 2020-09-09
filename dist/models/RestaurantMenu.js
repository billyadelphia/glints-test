"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantMenuModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("../config/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let RestaurantMenu = class RestaurantMenu extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], RestaurantMenu.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", Number)
], RestaurantMenu.prototype, "restaurantId", void 0);
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
], RestaurantMenu.prototype, "dishName", void 0);
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
], RestaurantMenu.prototype, "price", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], RestaurantMenu.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], RestaurantMenu.prototype, "updatedAt", void 0);
RestaurantMenu = tslib_1.__decorate([
    sequelize_typescript_1.Table({ tableName: "RestaurantMenus" })
], RestaurantMenu);
exports.restaurantMenuModel = RestaurantMenu;
sequelize_1.default.addModels([RestaurantMenu]);
exports.default = RestaurantMenu;
//# sourceMappingURL=RestaurantMenu.js.map