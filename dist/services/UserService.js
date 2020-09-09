"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const User_1 = require("../models/User");
const sequelize_1 = require("sequelize");
const UserPurchaseHistory_1 = require("../models/UserPurchaseHistory");
let UserService = class UserService {
    list(listParamUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const includeQuery = [{ model: UserPurchaseHistory_1.default, as: "purchaseHistories", attributes: [] }];
            const attributesQuery = ["id", "cashBalance", "name"];
            const index = includeQuery.findIndex((q) => q.as === "purchaseHistories");
            const userOrder = [];
            const userGroup = [];
            let limit = null;
            if (listParamUser.byTotalTransaction) {
                if (listParamUser.byTotalTransaction.date) {
                    includeQuery[index] = Object.assign(includeQuery[index], {
                        where: { createdAt: { [sequelize_1.Op.between]: [listParamUser.byTotalTransaction.date.from, listParamUser.byTotalTransaction.date.to] } },
                    });
                }
                if (listParamUser.byTotalTransaction.limit) {
                    attributesQuery.push([sequelize_1.default.literal(`SUM(purchaseHistories.transactionAmount)`), "totalTransactionAmount"]);
                    userOrder.push([sequelize_1.default.col("totalTransactionAmount"), "DESC"]);
                    userGroup.push("User.id");
                    limit = listParamUser.byTotalTransaction.limit;
                }
            }
            let finalQuery = { include: includeQuery, attributes: attributesQuery, order: userOrder };
            if (userGroup.length) {
                finalQuery = Object.assign(finalQuery, { group: userGroup });
            }
            if (limit) {
                finalQuery = Object.assign(finalQuery, { limit, subQuery: false });
            }
            // console.log("finalQuery", finalQuery);
            return yield User_1.default.findAll(finalQuery);
        });
    }
    totalUser(listParamTotalUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const includeQuery = [{ model: UserPurchaseHistory_1.default, as: "purchaseHistories" }];
            const index = includeQuery.findIndex((q) => q.as === "purchaseHistories");
            if (listParamTotalUser.date) {
                includeQuery[index] = Object.assign(includeQuery[index], {
                    where: { createdAt: { [sequelize_1.Op.between]: [listParamTotalUser.date.from, listParamTotalUser.date.to] } },
                });
            }
            let havingQuery = {};
            if (listParamTotalUser.operator) {
                havingQuery = sequelize_1.default.literal(`SUM(purchaseHistories.transactionAmount) ${listParamTotalUser.operator} ${listParamTotalUser.valueOfTransaction}`);
            }
            const lastQuery = { include: includeQuery, having: havingQuery, group: ["User.id"] };
            // console.log("lastQuery", lastQuery);
            const count = yield User_1.default.count(lastQuery);
            return count.length;
        });
    }
};
UserService = tslib_1.__decorate([
    common_1.Service()
], UserService);
exports.default = UserService;
//# sourceMappingURL=UserService.js.map