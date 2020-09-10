import {expect} from "chai";
import UserController from "./UserController";
import UserService from "../services/UserService";

const userController = new UserController(new UserService());
describe("UserController", async () => {
  it("should call UserController.list()", async () => {
    const data: any = {
      byTotalTransaction: {
        limit: 10,
        date: {
          from: "2020-02-10",
          to: "2020-04-03",
        },
      },
    };
    const controller = await userController.list(data);
    expect(controller).to.be.an("object");
  });

  it("should call RestaurantController.list()", async () => {
    const data: any = {
      data: {
        date: {
          from: "2020-02-10",
          to: "2020-12-12",
        },
        operator: ">",
        valueOfTransaction: 9,
      },
    };
    const controller = await userController.total(data);
    expect(controller).to.be.an("object");
  });
});
