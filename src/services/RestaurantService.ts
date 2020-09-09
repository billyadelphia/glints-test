import {Service} from "@tsed/common";
import Restaurant from "../models/Restaurant";
import {ListParam, PopularRestaurantParam} from "../controllers/types";
import RestaurantOpeningHour from "../models/RestaurantOpeningHour";
import RestaurantMenu from "../models/RestaurantMenu";
import Sequelize, {Op} from "sequelize";
import UserPurchaseHistory from "../models/UserPurchaseHistory";

@Service()
export default class RestaurantService {
  async list(listParam: ListParam): Promise<Restaurant[]> {
    let query = {};
    if (listParam.byTime) {
      if (listParam.byTime.day) {
        query = Object.assign(query, {day: listParam.byTime.day});
      }
      if (listParam.byTime.open) {
        query = Object.assign(query, {
          from: {
            [Op.between]: [
              listParam.byTime.open.from ? listParam.byTime.open.from : "00:00",
              listParam.byTime.open.to ? listParam.byTime.open.to : "23:59",
            ],
          },
        });
      }
      if (listParam.byTime.closed) {
        query = Object.assign(query, {
          to: {
            [Op.between]: [
              listParam.byTime.closed.from ? listParam.byTime.closed.from : "00:00",
              listParam.byTime.closed.to ? listParam.byTime.closed.to : "23:59",
            ],
          },
        });
      }
    }
    const restoAttribute: any[] = ["id", "cashBalance", "restaurantName"];
    const openingHourAttribute: any = [];
    if (listParam.byHours && listParam.byHours.by === "day") {
      query = Object.assign(query, {
        [Op.and]: Sequelize.literal(
          `(TIMESTAMPDIFF(MINUTE, openingHours.from, openingHours.to + INTERVAL (CASE WHEN openingHours.to < openingHours.from THEN 1 ELSE 0 END) DAY) / 60) ${listParam.byHours.operator} ${listParam.byHours.hours}`
        ),
      });
      openingHourAttribute.push([
        Sequelize.literal(
          `TIMESTAMPDIFF(MINUTE, openingHours.from, openingHours.to + INTERVAL (CASE WHEN openingHours.to < openingHours.from THEN 1 ELSE 0 END) DAY) / 60`
        ),
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
        [Op.and]: Sequelize.literal(
          `SUM(TIMESTAMPDIFF( MINUTE, openingHours.FROM, openingHours.TO + INTERVAL ( CASE WHEN openingHours.TO < openingHours.FROM THEN 1 ELSE 0 END ) DAY ) / 60) ${listParam.byHours.operator} ${listParam.byHours.hours}`
        ),
      });
      restaurantGroup.push("Restaurant.id");
      restoAttribute.push([
        Sequelize.literal(
          `SUM(TIMESTAMPDIFF( MINUTE, openingHours.FROM, openingHours.TO + INTERVAL ( CASE WHEN openingHours.TO < openingHours.FROM THEN 1 ELSE 0 END ) DAY ) / 60)`
        ),
        "hoursByWeek",
      ]);
    }
    const includeQuery: any = [];
    if (listParam.byDishes) {
      let includeMenu = {
        model: RestaurantMenu,
        as: "menus",
        // where: {},
        // attributes: openingHourAttribute,
      };

      if (listParam.byDishes.price) {
        includeMenu = Object.assign(includeMenu, {
          where: {
            price: {
              [Op.between]: [
                listParam.byDishes.price.from ? listParam.byDishes.price.from : 0,
                listParam.byDishes.price.to ? listParam.byDishes.price.to : await RestaurantMenu.max("price"),
              ],
            },
          },
          attributes: ["dishName", "price"],
        });
      }
      if (listParam.byDishes.operator && listParam.byDishes.number) {
        restaurantQuery = Object.assign(restaurantQuery, {
          [Op.and]: Sequelize.literal(`COUNT(menus.id) ${listParam.byDishes.operator} ${listParam.byDishes.number}`),
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
          where: {restaurantName: {[Op.like]: `%${listParam.byName.restaurantName}%`}},
        });
      }
      if (listParam.byName.dishesName) {
        if (!includeQuery.find((q: any) => q.as === "menus")) {
          includeQuery.push({
            model: RestaurantMenu,
            as: "menus",
          });
        }
        const index1 = includeQuery.findIndex((q: any) => q.as === "menus");

        includeQuery[index1] = Object.assign(includeQuery[index1], {where: {dishName: {[Op.like]: `%${listParam.byName.dishesName}%`}}});
      }
    }

    let finalQuery = {
      attributes: restoAttribute,
      having: restaurantQuery,
      include: [
        {
          model: RestaurantOpeningHour,
          as: "openingHours",
          where: query,
          attributes: openingHourAttribute,
        },
      ],
    };
    finalQuery = Object.assign(finalQuery, whereQueryRestaurant);
    if (restaurantGroup.length) {
      finalQuery = Object.assign(finalQuery, {group: restaurantGroup});
    }
    if (includeQuery.length) {
      for (const query2 of includeQuery) {
        finalQuery.include.push(query2);
      }
    }
    const resto = await Restaurant.findAll(finalQuery);

    return resto;
  }

  async popularRestaurant(param: PopularRestaurantParam): Promise<Restaurant[]> {
    let havingQuery = {};
    const groupQuery = ["Restaurant.id"];
    let orderQuery: any[] | null = null;
    if (param.by === "numberOfTransaction") {
      havingQuery = Object.assign(havingQuery, {
        [Op.and]: Sequelize.literal(`COUNT(transactions.id)`),
      });
      orderQuery = [[Sequelize.col("numberOfTransaction"), "DESC"]];
    }

    if (param.by === "dolarValue") {
      orderQuery = [["cashBalance", "DESC"]];
    }

    let finalQuery: any = {
      attributes: {include: [[Sequelize.literal(`COUNT(transactions.id)`), "numberOfTransaction"]]},
      include: [{model: UserPurchaseHistory, as: "transactions", attributes: []}],
    };
    finalQuery = Object.assign(finalQuery, {having: havingQuery});
    if (groupQuery.length) {
      finalQuery = Object.assign(finalQuery, {group: groupQuery});
    }
    if (orderQuery) {
      finalQuery = Object.assign(finalQuery, {order: orderQuery});
    }

    return await Restaurant.findAll(finalQuery);
  }

  // async listByHours(listParam: ListByHours): Promise<Restaurant[]> {
  //   // let query = {};
  //   // if (listParam.operator) {
  //   //    query = Object.assign(query, {day: listParam.operator});
  //   // }
  //   const resto = await Restaurant.findAll({
  //     include: [
  //       {
  //         model: RestaurantOpeningHour,
  //         as: "openingHours",
  //         attributes: {include: [[, "hours"]]},
  //         // where: query,
  //       },
  //     ],
  //   });

  //   return resto;
  // }
}
