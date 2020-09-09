"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const User_1 = require("../models/User");
const UserPurchaseHistory_1 = require("../models/UserPurchaseHistory");
const sequelize_1 = require("../config/sequelize");
const Restaurant_1 = require("../models/Restaurant");
const RestaurantMenu_1 = require("../models/RestaurantMenu");
const sequelize_2 = require("sequelize");
let TransactionService = class TransactionService {
    buy(param) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const resto = yield Restaurant_1.default.findByPk(param.restaurantId);
            const menu = yield RestaurantMenu_1.default.findByPk(param.menuId);
            const user = yield User_1.default.findByPk(param.userId);
            if (!resto) {
                throw new sequelize_2.ValidationError("Restaurant not found!");
            }
            if (!menu) {
                throw new sequelize_2.ValidationError("Menu not found!");
            }
            if (!user) {
                throw new sequelize_2.ValidationError("User not found!");
            }
            if (user.cashBalance < menu.price) {
                throw new sequelize_2.ValidationError("User cash balance is not enough for this transaction!");
            }
            return yield sequelize_1.default.transaction((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const userPurchaseHistory = new UserPurchaseHistory_1.default();
                userPurchaseHistory.userId = param.userId;
                userPurchaseHistory.dishName = menu.dishName;
                userPurchaseHistory.restaurantName = resto.restaurantName;
                userPurchaseHistory.transactionAmount = menu.price;
                yield userPurchaseHistory.save({ transaction: t });
                yield user.decrement("cashBalance", { by: userPurchaseHistory.transactionAmount, transaction: t });
                return userPurchaseHistory;
            }));
        });
    }
};
TransactionService = tslib_1.__decorate([
    common_1.Service()
], TransactionService);
exports.default = TransactionService;
//# sourceMappingURL=TransactionService.js.map