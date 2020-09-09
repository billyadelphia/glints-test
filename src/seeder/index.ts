import * as userWithPurchaseHistories from "../../data/users_with_purchase_history.json";
import * as restaurantWithMenu from "../../data/restaurant_with_menu.json";
import User from "../models/User";
import UserPurchaseHistory from "../models/UserPurchaseHistory";
import Restaurant from "../models/Restaurant";
import RestaurantOpeningHour from "../models/RestaurantOpeningHour";
import RestaurantMenu from "../models/RestaurantMenu";
import * as moment from "moment";
import {Op} from "sequelize";

const days: any = {
  Mon: 0,
  Tues: 1,
  Weds: 2,
  Thurs: 3,
  Fri: 4,
  Sat: 5,
  Sun: 6,
};
const seed = async () => {
  await User.destroy({where: {id: {[Op.ne]: null}}});
  await UserPurchaseHistory.destroy({where: {id: {[Op.ne]: null}}});
  await Restaurant.destroy({where: {id: {[Op.ne]: null}}});
  await RestaurantOpeningHour.destroy({where: {id: {[Op.ne]: null}}});
  await RestaurantMenu.destroy({where: {id: {[Op.ne]: null}}});
  const userDataArray = [];
  const purchaseHistories = [];
  for (const userData of userWithPurchaseHistories) {
    userDataArray.push({
      id: userData.id + 1,
      cashBalance: userData.cashBalance,
      name: userData.name,
    });
    for (const purchaseData of userData.purchaseHistory) {
      const date = moment(purchaseData.transactionDate, "MM/DD/YYYY HH:mm A").format("YYYY-MM-DD HH:mm:ss");
      purchaseHistories.push({
        userId: userData.id + 1,
        transactionAmount: purchaseData.transactionAmount,
        dishName: purchaseData.dishName,
        restaurantName: purchaseData.restaurantName,
        createdAt: date,
      });
    }
  }

  try {
    await User.bulkCreate(userDataArray);
    await UserPurchaseHistory.bulkCreate(purchaseHistories);
    // process.exit(0);
  } catch (err) {
    console.log("err", err);
  }

  const restaurantData = [];
  const openingHours = [];
  const menus = [];
  let id = 1;
  for (const restoData of restaurantWithMenu) {
    restaurantData.push({
      cashBalance: restoData.cashBalance,
      restaurantName: restoData.restaurantName,
      id,
    });
    // const resto = new Restaurant();
    // resto.cashBalance = restoData.cashBalance;
    // resto.restaurantName = restoData.restaurantName;
    // await resto.save();
    const hours = restoData.openingHours.split("/");
    for (const a of hours) {
      const bb = a.split(" ");
      let index = bb.length - 1;
      for (const b of bb.reverse()) {
        if (days[b.replace(",", "").trim()]) {
          break;
        }
        index--;
      }
      let dayString = "";
      let dateString = "";
      let index2 = 0;
      for (const b3 of bb.reverse()) {
        if (index >= index2) {
          dayString += b3 + " ";
        } else {
          dateString += b3 + " ";
        }
        index2++;
      }

      const rr = dayString.split(",");
      const daysData = [];
      for (const r of rr) {
        if (r) {
          if (r.includes("-")) {
            const split = r.split("-");
            for (let i = days[split[1].trim()]; i <= days[split[0].trim()]; i++) {
              daysData.push(i);
            }
          } else {
            daysData.push(days[r.trim()]);
          }
        }
      }

      const times = dateString.split("-");
      let times0 = times[0];
      let times1 = times[1];
      if (!times0) {
        times0 = times[1];
        times1 = times[2];
      }
      for (const day of daysData) {
        // const fromMoment = moment(times0.trim(), "hh:mm a");
        // const toMoment = moment(times1.trim(), "hh:mm a");

        const from = timeConvertor(times0.trim(), restoData.restaurantName);
        const to = timeConvertor(times1.trim(), restoData.restaurantName);
        if (day && from && to) {
          openingHours.push({
            day,
            from,
            to,
            restaurantId: id,
          });
        }

        // if (fromMoment.isBefore(toMoment)) {
        //   const from = timeConvertor(times0.trim(), restoData.restaurantName);
        //   const to = timeConvertor(times1.trim(), restoData.restaurantName);
        //   if (day && from && to) {
        //     openingHours.push({
        //       day,
        //       from,
        //       to,
        //       restaurantId: id,
        //     });
        //   }
        // } else {
        //   const from1 = timeConvertor(times0.trim(), restoData.restaurantName);
        //   const to1 = "23:59";
        //   openingHours.push({
        //     day,
        //     from: from1,
        //     to: to1,
        //     restaurantId: id,
        //   });
        //   const from2 = "00:00";
        //   const to2 = timeConvertor(times1.trim(), restoData.restaurantName);
        //   openingHours.push({
        //     day: day + 1,
        //     from: from2,
        //     to: to2,
        //     restaurantId: id,
        //   });
        // }
      }
    }

    for (const menu of restoData.menu) {
      menus.push({
        dishName: menu.dishName,
        price: menu.price,
        restaurantId: id,
      });
    }
    id++;
  }
  await Restaurant.bulkCreate(restaurantData);
  try {
    await RestaurantOpeningHour.bulkCreate(openingHours);
  } catch (err) {
    console.log("err", err);
  }

  await RestaurantMenu.bulkCreate(menus);
  process.exit(0);
};

const getDayPosition = (day: string) => {
  return days[day];
};

const timeConvertor = (time: string, resName = "") => {
  const bb = moment(time, "hh:mm a").format("HH:mm");
  if (bb === "invalid date" || bb === "Invalid date") {
    console.log("time", time);
    console.log("resName", resName);
    // throw new Error("time is invalid");
  }

  return bb;
  // if (!time) {
  //   console.log("restoData.restaurantName", resName);
  // }
};

seed();
