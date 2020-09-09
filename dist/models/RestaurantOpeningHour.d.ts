import { Model } from "sequelize-typescript";
declare class RestaurantOpeningHour extends Model<RestaurantOpeningHour> {
    id: number;
    restaurantId: number;
    day: number;
    from: string;
    to: string;
    hoursByDay: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const restaurantOpeningHourModel: typeof RestaurantOpeningHour;
export default RestaurantOpeningHour;
