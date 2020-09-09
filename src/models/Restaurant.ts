import sequelize from "../config/sequelize";
import {Table, Column, Model, DataType, CreatedAt, HasMany, UpdatedAt, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import RestaurantOpeningHour from "./RestaurantOpeningHour";
import RestaurantMenu from "./RestaurantMenu";
import UserPurchaseHistory from "./UserPurchaseHistory";
@Table({tableName: "Restaurants"})
class Restaurant extends Model<Restaurant> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({
    type: DataType.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  cashBalance!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  restaurantName!: string;

  @HasMany(() => RestaurantOpeningHour, {foreignKey: "restaurantId", as: "openingHours"})
  openingHours: RestaurantOpeningHour[];

  @HasMany(() => RestaurantMenu, {foreignKey: "restaurantId", as: "menus"})
  menus: RestaurantMenu[];

  @Column({type: DataType.VIRTUAL})
  hoursByWeek!: number;

  @HasMany(() => UserPurchaseHistory, {foreignKey: "restaurantName", as: "transactions", sourceKey: "restaurantName"})
  transactions: UserPurchaseHistory[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export const restaurantModel = Restaurant;
sequelize.addModels([Restaurant]);

export default Restaurant;
