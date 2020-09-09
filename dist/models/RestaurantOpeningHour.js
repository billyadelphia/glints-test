"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOpeningHourModel = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("../config/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let RestaurantOpeningHour = class RestaurantOpeningHour extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], RestaurantOpeningHour.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT,
        validate: {
            notEmpty: true,
        },
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", Number)
], RestaurantOpeningHour.prototype, "restaurantId", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], RestaurantOpeningHour.prototype, "day", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], RestaurantOpeningHour.prototype, "from", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
            trim: true,
        },
    }),
    tslib_1.__metadata("design:type", String)
], RestaurantOpeningHour.prototype, "to", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.VIRTUAL }),
    tslib_1.__metadata("design:type", Number)
], RestaurantOpeningHour.prototype, "hoursByDay", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], RestaurantOpeningHour.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], RestaurantOpeningHour.prototype, "updatedAt", void 0);
RestaurantOpeningHour = tslib_1.__decorate([
    sequelize_typescript_1.Table({ tableName: "RestaurantOpeningHours" })
], RestaurantOpeningHour);
exports.restaurantOpeningHourModel = RestaurantOpeningHour;
sequelize_1.default.addModels([RestaurantOpeningHour]);
exports.default = RestaurantOpeningHour;
//# sourceMappingURL=RestaurantOpeningHour.js.map