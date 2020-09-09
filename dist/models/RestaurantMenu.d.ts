import { Model } from "sequelize-typescript";
declare class RestaurantMenu extends Model<RestaurantMenu> {
    id: number;
    restaurantId: number;
    dishName: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const restaurantMenuModel: typeof RestaurantMenu;
export default RestaurantMenu;
