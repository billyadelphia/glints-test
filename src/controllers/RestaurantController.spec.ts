import {expect} from "chai";
import RestaurantController from "./RestaurantController";
import RestaurantService from "../services/RestaurantService";

const restaurantController = new RestaurantController(new RestaurantService());
describe("RestaurantController", async () => {
  it("should call RestaurantController.list()", async () => {
    const data: any = {
      day: 4,
      open: {
        from: "15:00",
        to: "18:09",
      },
      closed: {
        from: "17:09",
        to: "18:09",
      },
    };
    const controller = await restaurantController.listByDay(data);
    expect(controller).to.be.an("object");
  });

  it("should call RestaurantController.list()", async () => {
    const data: any = {
      by: "numberOfTransaction",
    };
    const controller = await restaurantController.popular(data);
    expect(controller).to.be.an("object");
  });
});
