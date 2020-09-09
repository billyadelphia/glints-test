import sequelize from "../config/sequelize";
import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement, BeforeCreate} from "sequelize-typescript";
import Restaurant from "./Restaurant";
import RestaurantMenu from "./RestaurantMenu";
@Table({tableName: "UserPurchaseHistories"})
class UserPurchaseHistory extends Model<UserPurchaseHistory> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({
    type: DataType.BIGINT,
    validate: {
      notEmpty: true,
      // async checkUser(value: string | undefined) {
      //   if (value) {
      //     const userModel = require("./User").default;
      //     const user = await userModel.findOne({attributes: ["id"], where: {id: value}});
      //     if (!user) {
      //       throw new Error("User not found !");
      //     }
      //   }
      // },
    },
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  transactionAmount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
      // async checkDishname(value: string | undefined) {
      //   if (value) {
      //     const dish = await RestaurantMenu.findOne({attributes: ["id"], where: {dishName: value}});
      //     if (!dish) {
      //       throw new Error("Dish name not found!");
      //     }
      //   }
      // },
    },
  })
  dishName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
      // async checkRestaurantName(value: string | undefined) {
      //   if (value) {
      //     const resto = await Restaurant.findOne({attributes: ["id"], where: {restaurantName: value}});
      //     if (!resto) {
      //       throw new Error("Restaurant not found!");
      //     }
      //   }
      // },
    },
  })
  restaurantName!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export const userPurchaseHistoryModel = UserPurchaseHistory;
sequelize.addModels([UserPurchaseHistory]);

export default UserPurchaseHistory;
