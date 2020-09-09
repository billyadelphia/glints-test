"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const Restaurant_1 = require("../models/Restaurant");
const RestaurantOpeningHour_1 = require("../models/RestaurantOpeningHour");
const RestaurantMenu_1 = require("../models/RestaurantMenu");
const sequelize_1 = require("sequelize");
const UserPurchaseHistory_1 = require("../models/UserPurchaseHistory");
let RestaurantService = class RestaurantService {
    list(listParam) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (listParam.byTime) {
                if (listParam.byTime.day) {
                    query = Object.assign(query, { day: listParam.byTime.day });
                }
                if (listParam.byTime.open) {
                    query = Object.assign(query, {
                        from: {
                            [sequelize_1.Op.between]: [
                                listParam.byTime.open.from ? listParam.byTime.open.from : "00:00",
                                listParam.byTime.open.to ? listParam.byTime.open.to : "23:59",
                            ],
                        },
                    });
                }
                if (listParam.byTime.closed) {
                    query = Object.assign(query, {
                        to: {
                            [sequelize_1.Op.between]: [
                                listParam.byTime.closed.from ? listParam.byTime.closed.from : "00:00",
                                listParam.byTime.closed.to ? listParam.byTime.closed.to : "23:59",
                            ],
                        },
                    });
                }
            }
            const restoAttribute = ["id", "cashBalance", "restaurantName"];
            const openingHourAttribute = [];
            if (listParam.byHours && listParam.byHours.by === "day") {
                query = Object.assign(query, {
                    [sequelize_1.Op.and]: sequelize_1.default.literal(`(TIMESTAMPDIFF(MINUTE, openingHours.from, openingHours.to + INTERVAL (CASE WHEN openingHours.to < openingHours.from THEN 1 ELSE 0 END) DAY) / 60) ${listParam.byHours.operator} ${listParam.byHours.hours}`),
                });
                openingHourAttribute.push([
                    sequelize_1.default.literal(`TIMESTAMPDIFF(MINUTE, openingHours.from, openingHours.to + INTERVAL (CASE WHEN openingHours.to < openingHours.from THEN 1 ELSE 0 END) DAY) / 60`),
                    "hoursByDay",
                ]);
                openingHourAttribute.push("day");
                openingHourAttribute.push("from");
                openingHourAttribute.push("to");
            }
            let restaurantQuery = {};
            const restaurantGroup = [];
            if (listParam.byHours && listParam.byHours.by === "week") {
                restaurantQuery = Object.assign(restaurantQuery, {
                    [sequelize_1.Op.and]: sequelize_1.default.literal(`SUM(TIMESTAMPDIFF( MINUTE, openingHours.FROM, openingHours.TO + INTERVAL ( CASE WHEN openingHours.TO < openingHours.FROM THEN 1 ELSE 0 END ) DAY ) / 60) ${listParam.byHours.operator} ${listParam.byHours.hours}`),
                });
                restaurantGroup.push("Restaurant.id");
                restoAttribute.push([
                    sequelize_1.default.literal(`SUM(TIMESTAMPDIFF( MINUTE, openingHours.FROM, openingHours.TO + INTERVAL ( CASE WHEN openingHours.TO < openingHours.FROM THEN 1 ELSE 0 END ) DAY ) / 60)`),
                    "hoursByWeek",
                ]);
            }
            const includeQuery = [];
            if (listParam.byDishes) {
                let includeMenu = {
                    model: RestaurantMenu_1.default,
                    as: "menus",
                };
                if (listParam.byDishes.price) {
                    includeMenu = Object.assign(includeMenu, {
                        where: {
                            price: {
                                [sequelize_1.Op.between]: [
                                    listParam.byDishes.price.from ? listParam.byDishes.price.from : 0,
                                    listParam.byDishes.price.to ? listParam.byDishes.price.to : yield RestaurantMenu_1.default.max("price"),
                                ],
                            },
                        },
                        attributes: ["dishName", "price"],
                    });
                }
                if (listParam.byDishes.operator && listParam.byDishes.number) {
                    restaurantQuery = Object.assign(restaurantQuery, {
                        [sequelize_1.Op.and]: sequelize_1.default.literal(`COUNT(menus.id) ${listParam.byDishes.operator} ${listParam.byDishes.number}`),
                    });
                    restaurantGroup.push("Restaurant.id");
                    restaurantGroup.push("menus.id");
                }
                includeQuery.push(includeMenu);
            }
            let whereQueryRestaurant = {};
            if (listParam.byName) {
                if (listParam.byName.restaurantName) {
                    whereQueryRestaurant = Object.assign(whereQueryRestaurant, {
                        where: { restaurantName: { [sequelize_1.Op.like]: `%${listParam.byName.restaurantName}%` } },
                    });
                }
                if (listParam.byName.dishesName) {
                    if (!includeQuery.find((q) => q.as === "menus")) {
                        includeQuery.push({
                            model: RestaurantMenu_1.default,
                            as: "menus",
                        });
                    }
                    const index1 = includeQuery.findIndex((q) => q.as === "menus");
                    includeQuery[index1] = Object.assign(includeQuery[index1], { where: { dishName: { [sequelize_1.Op.like]: `%${listParam.byName.dishesName}%` } } });
                }
            }
            let finalQuery = {
                attributes: restoAttribute,
                having: restaurantQuery,
                include: [
                    {
                        model: RestaurantOpeningHour_1.default,
                        as: "openingHours",
                        where: query,
                        attributes: openingHourAttribute,
                    },
                ],
            };
            finalQuery = Object.assign(finalQuery, whereQueryRestaurant);
            if (restaurantGroup.length) {
                finalQuery = Object.assign(finalQuery, { group: restaurantGroup });
            }
            if (includeQuery.length) {
                for (const query2 of includeQuery) {
                    finalQuery.include.push(query2);
                }
            }
            const resto = yield Restaurant_1.default.findAll(finalQuery);
            return resto;
        });
    }
    popularRestaurant(param) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let havingQuery = {};
            const groupQuery = ["Restaurant.id"];
            let orderQuery = null;
            if (param.by === "numberOfTransaction") {
                havingQuery = Object.assign(havingQuery, {
                    [sequelize_1.Op.and]: sequelize_1.default.literal(`COUNT(transactions.id)`),
                });
                orderQuery = [[sequelize_1.default.col("numberOfTransaction"), "DESC"]];
            }
            if (param.by === "dolarValue") {
                orderQuery = [["cashBalance", "DESC"]];
            }
            let finalQuery = {
                attributes: { include: [[sequelize_1.default.literal(`COUNT(transactions.id)`), "numberOfTransaction"]] },
                include: [{ model: UserPurchaseHistory_1.default, as: "transactions", attributes: [] }],
            };
            finalQuery = Object.assign(finalQuery, { having: havingQuery });
            if (groupQuery.length) {
                finalQuery = Object.assign(finalQuery, { group: groupQuery });
            }
            if (orderQuery) {
                finalQuery = Object.assign(finalQuery, { order: orderQuery });
            }
            return yield Restaurant_1.default.findAll(finalQuery);
        });
    }
};
RestaurantService = tslib_1.__decorate([
    common_1.Service()
], RestaurantService);
exports.default = RestaurantService;
//# sourceMappingURL=RestaurantService.js.map