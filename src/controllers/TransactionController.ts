import {BodyParams, Controller, Put, Req, Status, $log, Get, Post, HeaderParams} from "@tsed/common";
import {BuyParam} from "./types";
import TransactionService from "../services/TransactionService";
import {response} from "../helpers/response";

@Controller("/transaction")
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post("/buy")
  async buy(@Req() req: Req, @BodyParams("data") listParam: BuyParam) {
    const list = await this.transactionService.buy(listParam);

    return response({transaction: list});
  }
}
