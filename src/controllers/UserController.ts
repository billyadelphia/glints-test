import {BodyParams, Controller, Put, Req, Status, $log, Get, Post, HeaderParams} from "@tsed/common";
import {ListParamUser, ListParamTotalUser} from "./types";
import UserService from "../services/UserService";
import {response} from "@/helpers/response";

@Controller("/user")
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/list")
  async list(@Req() req: Req, @BodyParams("data") listParam: ListParamUser) {
    const list = await this.userService.list(listParam);

    return response({users: list});
  }

  @Post("/total")
  async total(@Req() req: Req, @BodyParams("data") listParam: ListParamTotalUser) {
    const list = await this.userService.totalUser(listParam);

    return response({users: list});
  }
}
