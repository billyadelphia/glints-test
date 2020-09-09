import {Service} from "@tsed/common";
import {ListParamUser, ListParamTotalUser} from "../controllers/types";
import User from "../models/User";
import Sequelize, {Op} from "sequelize";
import UserPurchaseHistory from "../models/UserPurchaseHistory";

@Service()
export default class UserService {
  async list(listParamUser: ListParamUser) {
    const includeQuery: any = [{model: UserPurchaseHistory, as: "purchaseHistories", attributes: []}];
    const attributesQuery: any[] = ["id", "cashBalance", "name"];
    const index = includeQuery.findIndex((q: any) => q.as === "purchaseHistories");
    const userOrder: any = [];
    const userGroup: any = [];
    let limit: null | number = null;
    if (listParamUser.byTotalTransaction) {
      if (listParamUser.byTotalTransaction.date) {
        includeQuery[index] = Object.assign(includeQuery[index], {
          where: {createdAt: {[Op.between]: [listParamUser.byTotalTransaction.date.from, listParamUser.byTotalTransaction.date.to]}},
        });
      }
      if (listParamUser.byTotalTransaction.limit) {
        attributesQuery.push([Sequelize.literal(`SUM(purchaseHistories.transactionAmount)`), "totalTransactionAmount"]);
        userOrder.push([Sequelize.col("totalTransactionAmount"), "DESC"]);
        userGroup.push("User.id");
        limit = listParamUser.byTotalTransaction.limit;
      }
    }
    let finalQuery = {include: includeQuery, attributes: attributesQuery, order: userOrder};
    if (userGroup.length) {
      finalQuery = Object.assign(finalQuery, {group: userGroup});
    }
    if (limit) {
      finalQuery = Object.assign(finalQuery, {limit, subQuery: false});
    }
    // console.log("finalQuery", finalQuery);

    return await User.findAll(finalQuery);
  }

  async totalUser(listParamTotalUser: ListParamTotalUser) {
    const includeQuery: any[] = [{model: UserPurchaseHistory, as: "purchaseHistories"}];
    const index = includeQuery.findIndex((q: any) => q.as === "purchaseHistories");
    if (listParamTotalUser.date) {
      includeQuery[index] = Object.assign(includeQuery[index], {
        where: {createdAt: {[Op.between]: [listParamTotalUser.date.from, listParamTotalUser.date.to]}},
      });
    }
    let havingQuery = {};
    if (listParamTotalUser.operator) {
      havingQuery = Sequelize.literal(
        `SUM(purchaseHistories.transactionAmount) ${listParamTotalUser.operator} ${listParamTotalUser.valueOfTransaction}`
      );
    }
    const lastQuery = {include: includeQuery, having: havingQuery, group: ["User.id"]};
    // console.log("lastQuery", lastQuery);
    const count = await User.count(lastQuery);

    return count.length;
  }
}
