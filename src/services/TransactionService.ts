import {Service} from "@tsed/common";
import {BuyParam} from "../controllers/types";
import User from "../models/User";
import UserPurchaseHistory from "../models/UserPurchaseHistory";
import sequelize from "../config/sequelize";
import Restaurant from "../models/Restaurant";
import RestaurantMenu from "../models/RestaurantMenu";
import {ValidationError} from "sequelize";

@Service()
export default class TransactionService {
  async buy(param: BuyParam) {
    const resto = await Restaurant.findByPk(param.restaurantId);
    const menu = await RestaurantMenu.findByPk(param.menuId);
    const user = await User.findByPk(param.userId);
    if (!resto) {
      throw new ValidationError("Restaurant not found!");
    }
    if (!menu) {
      throw new ValidationError("Menu not found!");
    }

    if (!user) {
      throw new ValidationError("User not found!");
    }

    if (user.cashBalance < menu.price) {
      throw new ValidationError("User cash balance is not enough for this transaction!");
    }

    return await sequelize.transaction(async (t) => {
      const userPurchaseHistory = new UserPurchaseHistory();
      userPurchaseHistory.userId = param.userId;
      userPurchaseHistory.dishName = menu.dishName;
      userPurchaseHistory.restaurantName = resto.restaurantName;
      userPurchaseHistory.transactionAmount = menu.price;
      await userPurchaseHistory.save({transaction: t});

      await user.decrement("cashBalance", {by: userPurchaseHistory.transactionAmount, transaction: t});

      return userPurchaseHistory;
    });
  }
}
