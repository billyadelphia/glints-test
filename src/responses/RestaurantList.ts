import {Description, Example, Property, Title} from "@tsed/common";
import {Restaurant} from "./types";
import SuccessResponse from "./SuccessResponse";

export class RestaurantDataList implements Restaurant {
  @Property()
  @Title("iD")
  @Description("Description of calendar model id")
  @Example("Description example")
  public id: number;

  @Property()
  public cashBalance: string;

  @Property()
  public restaurantName: string;
}

export default class RestaurantList {
  @Property()
  public data: RestaurantList[];

  @Property()
  public meta: Object;

  @Property()
  @Example("Description example")
  public status: number = 200;
}
