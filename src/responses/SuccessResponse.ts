import {Description, Example, Property, Title} from "@tsed/common";
import {SuccessResponse} from "./types";

export default class RestaurantList implements SuccessResponse {
  @Property()
  data: any;

  @Property()
  meta: any;

  @Property()
  status: number;
}
