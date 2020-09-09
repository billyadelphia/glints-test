import sequelize from "../config/sequelize";
import {Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, PrimaryKey, AutoIncrement} from "sequelize-typescript";
import UserPurchaseHistory from "./UserPurchaseHistory";

@Table({tableName: "Users"})
class User extends Model<User> {
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
  name!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => UserPurchaseHistory, {foreignKey: "userId", as: "purchaseHistories"})
  purchaseHistories: UserPurchaseHistory[];
}

export const userModel = User;
sequelize.addModels([User]);

export default User;
