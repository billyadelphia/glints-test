import { ListParam, PopularRestaurantParam } from "./types";
import RestaurantService from "../services/RestaurantService";
export default class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    listByDay(listParam: ListParam): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
    popular(listParam: PopularRestaurantParam): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
}
