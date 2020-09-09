import { Model } from "sequelize-typescript";
import RestaurantOpeningHour from "./RestaurantOpeningHour";
import RestaurantMenu from "./RestaurantMenu";
import UserPurchaseHistory from "./UserPurchaseHistory";
declare class Restaurant extends Model<Restaurant> {
    id: number;
    cashBalance: number;
    restaurantName: string;
    openingHours: RestaurantOpeningHour[];
    menus: RestaurantMenu[];
    hoursByWeek: number;
    transactions: UserPurchaseHistory[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const restaurantModel: typeof Restaurant;
export default Restaurant;
