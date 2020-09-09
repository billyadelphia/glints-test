import sequelize from "../config/sequelize";
import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, PrimaryKey, AutoIncrement} from "sequelize-typescript";

@Table({tableName: "RestaurantOpeningHours"})
class RestaurantOpeningHour extends Model<RestaurantOpeningHour> {
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
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  day!: number;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  from!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    validate: {
      notEmpty: true,
      trim: true,
    },
  })
  to!: string;

  @Column({type: DataType.VIRTUAL})
  hoursByDay!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export const restaurantOpeningHourModel = RestaurantOpeningHour;
sequelize.addModels([RestaurantOpeningHour]);

export default RestaurantOpeningHour;
