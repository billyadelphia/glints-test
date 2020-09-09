import sequelize from "../config/sequelize";
import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from "sequelize-typescript";

@Table({tableName: "RestaurantMenus"})
class RestaurantMenu extends Model<RestaurantMenu> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({
    type: DataType.BIGINT,
    validate: {
      notEmpty: true,
    },
    allowNull: false,
  })
  restaurantId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  dishName!: string;

  @Column({
    type: DataType.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  price!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export const restaurantMenuModel = RestaurantMenu;
sequelize.addModels([RestaurantMenu]);

export default RestaurantMenu;
