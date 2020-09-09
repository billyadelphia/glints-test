import { Restaurant } from "./types";
export declare class RestaurantDataList implements Restaurant {
    id: number;
    cashBalance: string;
    restaurantName: string;
}
export default class RestaurantList {
    data: RestaurantList[];
    meta: Object;
    status: number;
}
