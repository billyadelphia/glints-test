"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("../config/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const RestaurantOpeningHour_1 = require("./RestaurantOpeningHour");
const RestaurantMenu_1 = require("./RestaurantMenu");
const UserPurchaseHistory_1 = require("./UserPurchaseHistory");
let Restaurant = class Restaurant extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Restaurant.prototype, "id", void 0);
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
], Restaurant.prototype, "cashBalance", void 0);
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
], Restaurant.prototype, "restaurantName", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => RestaurantOpeningHour_1.default, { foreignKey: "restaurantId", as: "openingHours" }),
    tslib_1.__metadata("design:type", Array)
], Restaurant.prototype, "openingHours", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => RestaurantMenu_1.default, { foreignKey: "restaurantId", as: "menus" }),
    tslib_1.__metadata("design:type", Array)
], Restaurant.prototype, "menus", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.VIRTUAL }),
    tslib_1.__metadata("design:type", Number)
], Restaurant.prototype, "hoursByWeek", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.HasMany(() => UserPurchaseHistory_1.default, { foreignKey: "restaurantName", as: "transactions", sourceKey: "restaurantName" }),
    tslib_1.__metadata("design:type", Array)
], Restaurant.prototype, "transactions", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Restaurant.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Restaurant.prototype, "updatedAt", void 0);
Restaurant = tslib_1.__decorate([
    sequelize_typescript_1.Table({ tableName: "Restaurants" })
], Restaurant);
exports.restaurantModel = Restaurant;
sequelize_1.default.addModels([Restaurant]);
exports.default = Restaurant;
//# sourceMappingURL=Restaurant.js.map