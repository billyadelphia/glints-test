import {expect} from "chai";
import TransactionController from "./TransactionController";
import TransactionService from "../services/TransactionService";

const transactionController = new TransactionController(new TransactionService());
describe("TransactionController", async () => {
  it("should call TransactionController.buy()", async () => {
    const data: any = {
      userId: 1,
      restaurantId: 1,
      menuId: 1,
    };
    const controller = await transactionController.buy(data);
    expect(controller).to.be.an("object");
  });
});
