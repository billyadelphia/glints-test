import { Req } from "@tsed/common";
import { ListParam, PopularRestaurantParam } from "./types";
import RestaurantService from "../services/RestaurantService";
export default class RestaurantController {
    private readonly restaurantService;
    constructor(restaurantService: RestaurantService);
    listByDay(req: Req, listParam: ListParam): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
    popular(req: Req, listParam: PopularRestaurantParam): Promise<{
        data: any;
        meta: any;
        status: number;
    }>;
}
