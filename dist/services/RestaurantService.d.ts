import Restaurant from "../models/Restaurant";
import { ListParam, PopularRestaurantParam } from "../controllers/types";
export default class RestaurantService {
    list(listParam: ListParam): Promise<Restaurant[]>;
    popularRestaurant(param: PopularRestaurantParam): Promise<Restaurant[]>;
}
