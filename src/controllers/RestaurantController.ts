import {BodyParams, Description, Controller, Returns, Put, Req, Status, $log, Get, Post, HeaderParams} from "@tsed/common";
import {ListParam, PopularRestaurantParam} from "./types";
import RestaurantService from "../services/RestaurantService";
import {response} from "../helpers/response";

@Controller("/restaurant")
export default class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post("/list")
  async listByDay(@BodyParams("data") listParam: ListParam) {
    const list = await this.restaurantService.list(listParam);

    return response({restaurants: list});
  }

  @Post("/list-popular-restaurants")
  async popular(@BodyParams("data") listParam: PopularRestaurantParam) {
    const list = await this.restaurantService.popularRestaurant(listParam);

    return response({restaurants: list});
  }
}
